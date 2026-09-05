---
title: "Understanding PaCMAP"
date: "2026-07-20"
excerpt: "A practitioner's guide to PaCMAP: when it beats t-SNE and UMAP, the five lines of code you need, what the three hyperparameters actually do, how to read the resulting plot without over-reading it, and which follow-up method to reach for when PaCMAP is not the right tool."
tags: ["dimensionality-reduction", "pacmap", "visualization", "interactive"]
---

You ran t-SNE, got a picture, changed the random seed, and got a different picture. Or you ran UMAP, saw two clusters sitting far apart, and had no way to tell whether that distance meant anything. Both are expected behavior, and both come from the same gap: t-SNE and UMAP are built to preserve *local* structure, meaning who is near whom, and neither has a mechanism that keeps the *global* layout honest. t-SNE has none at all. UMAP inherits one from its spectral or PCA initialization, so the layout moves when the initialization does.

[PaCMAP](https://github.com/YingfanWang/PaCMAP) (Pairwise Controlled Manifold Approximation and Projection; Wang, Huang, Sun & Rudin, [JMLR 2021](https://jmlr.org/papers/v22/20-1061.html)) adds the missing mechanism. It preserves global structure directly, through a third kind of point pair that no other force-directed embedding samples, rather than depending on how the optimization happened to start.

> **Prefer to see it than read it?** The [interactive version of this article](/pacmap/) has eleven live figures. Drag the sliders on a 3D mammoth and watch t-SNE and UMAP fall apart while PaCMAP holds its shape, rotate a Fashion-MNIST projection, or step the optimizer through its schedule frame by frame.

## Start here: is PaCMAP the right tool for your problem?

| What you're running into | Does PaCMAP help? |
| --- | --- |
| Two runs of the same method give two different pictures | **Yes.** This is the failure PaCMAP was designed around. |
| Clusters look right, but their *arrangement* looks arbitrary | **Yes.** Global layout is the thing PaCMAP optimizes for explicitly. |
| You have to hand-tune perplexity or `n_neighbors` to get anything sensible | **Yes.** PaCMAP's defaults are meant to be left alone (see below). |
| Cluster boundaries are mushy and neighboring classes bleed together | **Partly.** Try [LocalMAP](#localmap--when-your-clusters-bleed-into-each-other) instead. |
| You need to embed *new* points later without refitting | **No.** Use [ParamRepulsor](#paramrepulsor--when-you-need-to-embed-new-points-later). |
| You need to know which parts of the layout are trustworthy | **No.** Use [RashomonDR](#rashomondr--when-you-need-to-know-what-to-trust). |
| You need to read distances off the plot quantitatively | **No**, and no neighbor-embedding method will give you that. Use PCA or classical MDS, which have a defined metric interpretation. |

## The five lines you actually need

```bash
pip install pacmap
```

```python
import numpy as np
import pacmap

X = np.load("my_data.npy")                  # (n_samples, n_features), float
reducer = pacmap.PaCMAP(n_components=2, random_state=0)
Y = reducer.fit_transform(X, init="pca")    # (n_samples, 2)
```

That is the whole intended workflow. A few things worth knowing about what the defaults do to your data before you go looking for knobs to turn:

- **It runs PCA on your input first.** With `apply_pca=True` (the default), any input wider than 100 columns is reduced to 100 dimensions with a truncated SVD, and the pairs are built in *that* space. It is a large speed win and it denoises, but if you need pairs constructed on your raw features, pass `apply_pca=False`.
- **Set `random_state` anyway.** PaCMAP is far more stable across seeds than t-SNE or UMAP, but "more stable" is not "deterministic", and you want to be able to reproduce the figure that ends up in your paper.
- **`init="pca"` is the default**, and unlike UMAP the final layout does not hinge on it. The optimization schedule below is what fixes the global structure.
- **Let `n_neighbors` scale with your data.** The default is a flat `10`. Pass `n_neighbors=None` instead and PaCMAP scales it for you: `10` up to 10 000 points, then `round(10 + 15 * (log10(n) - 4))` above that. On a large dataset this is usually the one change worth making.

## What PaCMAP is doing

Everything PaCMAP does follows from three sets of point pairs, sampled once before optimization begins and then pushed or pulled at every step:

**Neighbor pairs (NN)**, *pull.* Each point's `n_neighbors` nearest neighbors, measured with a locally scaled Euclidean distance so that dense and sparse regions are treated comparably. These preserve local structure, and every method has some version of them.

**Mid-near pairs (MN)**, *weak pull.* For each point, sample six other points at random and keep the second closest; repeat `MN_ratio × n_neighbors` times. The result is a pair that is neither a neighbor nor unrelated. It sits at moderate distance. **This is the ingredient no other force-directed method has**, and it is what holds the global layout in place.

**Further pairs (FP)**, *push.* `FP_ratio × n_neighbors` random points per point, pushed apart. They keep unrelated clusters from collapsing into each other.

The weights on those three terms change over three optimization phases (`num_iters=(100, 100, 250)`). The mid-near weight starts at **1000**, decays linearly to **3** over the first phase, holds there through the second, and drops to **0** for the last 250 iterations. In other words: get the global arrangement right first, then refine local neighborhoods with the global scaffolding already in place. That schedule, not the initialization, is why PaCMAP's layout is reproducible.

## The three knobs, and when to touch them

| Parameter | Default | What it controls | Worth changing when |
| --- | --- | --- | --- |
| `n_neighbors` | `10` | How many attractive neighbor pairs each point gets | Your dataset is large, so pass `None` to let it scale. Very low values fragment the embedding. |
| `MN_ratio` | `0.5` | How much global-structure pull there is | Rarely. Raise it if the overall arrangement still looks scrambled on a dataset with known large-scale structure. |
| `FP_ratio` | `2.0` | How much repulsion separates unrelated points | Rarely. Lower it if clusters are blown so far apart that within-cluster structure is unreadable. |

The authors' position is that these defaults are meant to be left alone. The Duke DR Group's survey of DR methods says it outright. PaCMAP "has no parameters that are designed to be tuned," in a post arguing that "ideally, the parameters should be fixed so no one needs to try to tune them." (That page is offline as of September 2026; the quotations are from an [archived copy](https://web.archive.org/web/20260611102621/https://sites.duke.edu/dimensionreduction/).) The PaCMAP README is blunt about the other half of it: changing these values "will affect the result of dimension reduction significantly."

Both are true, and together they are the actual rule. The parameters matter a great deal, which is precisely why you should not tune them by eye. Dimensionality reduction is unsupervised, so you have no held-out signal telling you which setting is correct. If you tune until the picture looks the way you expected, you have fitted the picture to your expectations and can no longer use it as evidence for them. Change a default when you have a stated reason, and report it.

## Reading a PaCMAP plot without over-reading it

1. **Cluster membership is the reliable signal.** Which points group together is what these methods are built to get right.
2. **Between-cluster distance is qualitative.** PaCMAP's global structure is meaningfully better than t-SNE's or UMAP's, but "meaningfully better" still does not mean you can measure it. Don't put a number on a gap.
3. **On-screen cluster size and density are not data density.** All of these methods stretch sparse regions and compress dense ones.
4. **The axes mean nothing.** There are no units, and any rotation or reflection of the whole embedding is equally valid.
5. **Run two or three seeds before you believe a layout feature.** If a gap or an arrangement survives reseeding, it is probably in the data. If it moves, it was in the optimizer.
6. **Color by something you already know**: labels, batch, acquisition date, site. If the structure tracks a nuisance variable, you have found a batch effect, not biology.
7. **Verify anything you would act on in the original space.** A kNN check or a statistical test on the raw features, not on the projection.

Point 5 is the practical form of a deeper result: for any dataset there is not one correct embedding but a whole *set* of them that fit the data equally well. That is the subject of RashomonDR, below.

## When PaCMAP is not the right tool

### LocalMAP, when your clusters bleed into each other

PaCMAP draws its neighbor pairs *once*, before optimization, from Euclidean distance in the input space. If that initial graph is noisy, PaCMAP inherits its mistakes for the whole run. **LocalMAP** (Wang, Huang, Sun & Rudin, [AAAI 2025](https://arxiv.org/abs/2412.15426)) re-adjusts the neighbor graph dynamically during the final phase, tightening clusters that were sampled with poor neighbors. Cluster boundaries come out noticeably crisper, with global structure and stability intact.

It ships inside the same package and takes the same arguments, so it is a genuine drop-in:

```python
reducer = pacmap.LocalMAP(n_components=2, random_state=0)
Y = reducer.fit_transform(X, init="pca")
```

### ParamRepulsor, when you need to embed new points later

PaCMAP does have a `transform()` method, but read its warning before you rely on it: it treats the new input as an additional dataset, so *the same point can land in a different place on a different call*. That is fine for a one-off look and wrong for a pipeline.

**ParamRepulsor** (Huang, Wang & Rudin, [NeurIPS 2024](https://openreview.net/pdf?id=eYNYnYle41)) makes the embedding *parametric*: it trains a small neural network mapping high-dimensional points to coordinates, so new points embed in constant time with a stable, reusable function. The paper's finding is that naively parametrizing a PaCMAP-style loss loses too much repulsion, so a stronger repulsion term is added to restore cluster separation.

```bash
git clone https://github.com/hyhuang00/ParamRepulsor.git
cd ParamRepulsor && pip install .   # torch is not installed for you; see the repo for extras
```

```python
import parampacmap

reducer = parampacmap.ParamPaCMAP()   # the stronger ParamRepulsor loss is on by default
Y = reducer.fit_transform(X)
```

### RashomonDR, when you need to know what to trust

Dimensionality reduction is inherently non-unique. For a given dataset there is a whole *Rashomon set* of embeddings that preserve its structure equally well while looking visually different, and any single plot hides that ambiguity from you. **RashomonDR** (Sun, Huang, Parikh & Rudin, AISTATS 2026; [arXiv](https://arxiv.org/abs/2604.00485), [code](https://github.com/williamsyy/RashomonDR)) formalises that set and does three things with it: aligns embeddings to a PCA-informed reference frame so the axes become interpretable, aligns a dimension with a concept you supply, and extracts the *common knowledge*, the neighbor relationships that survive across the whole set, into a single Common Knowledge PaCMAP embedding. If you are going to make a claim from a projection, this is the tool that tells you which parts of it are load-bearing.

## See it move

The [interactive article](/pacmap/) is where the arguments above become visible rather than asserted. Things worth doing there:

- Drag the parameter sliders under the mammoth and watch t-SNE scramble it at every perplexity and UMAP break at the extremes, while PaCMAP keeps the animal intact across the whole range.
- Click any point on the rotating Swiss roll to move the anchor, then toggle between NN, MN and FP to see exactly which partners that point got. This is the clearest picture of what mid-near pairs are.
- Drag the seed slider on the stability figure. Every embedding is Procrustes-aligned to the first, so what you see is real seed variance, not rotation.
- Press play on the toy datasets to watch the three-phase schedule run: global arrangement first, local refinement last.

## References

- **PaCMAP**: [paper (JMLR 2021)](https://jmlr.org/papers/v22/20-1061.html) · [code](https://github.com/YingfanWang/PaCMAP)
- **LocalMAP**: [paper (AAAI 2025)](https://arxiv.org/abs/2412.15426) · [code](https://github.com/williamsyy/LocalMAP/tree/localmap)
- **ParamRepulsor**: [paper (NeurIPS 2024)](https://openreview.net/pdf?id=eYNYnYle41) · [code](https://github.com/hyhuang00/ParamRepulsor)
- **RashomonDR**: [paper (AISTATS 2026)](https://arxiv.org/abs/2604.00485) · [code](https://github.com/williamsyy/RashomonDR)
