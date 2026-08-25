---
title: "Understanding PaCMAP"
date: "2026-07-20"
excerpt: "An interactive tour of PaCMAP — a dimensionality-reduction method that preserves both local and global structure, with an animated mammoth, a Fashion-MNIST comparison, and a seed-stability test against t-SNE and UMAP."
tags: ["dimensionality-reduction", "pacmap", "visualization", "interactive"]
---

Dimensionality reduction is one of the practitioner's most useful tools. This post is the interactive companion to the [PaCMAP paper](https://jmlr.org/papers/v22/20-1061.html) — a woolly mammoth reduced four ways, a Fashion-MNIST comparison, the three PaCMAP pair types visualised on a rotating 3D Swiss roll, the loss function in KaTeX, a seed-stability test against t-SNE and UMAP, and a tour of the three follow-up algorithms (LocalMAP, ParamRepulsor, RashomonDR).

**Open the full interactive article →** [Understanding PaCMAP](/pacmap/)

Every figure is fully interactive. Sliders change hyperparameters live; the play button animates the PaCMAP optimisation over its three-phase schedule; the Swiss-roll pair-definitions figure lets you drag to rotate and click any point to move the anchor.

### What's in the article

- **Figure 1** — The mammoth, four ways (original 3D vs. t-SNE vs. UMAP vs. PaCMAP)
- **Figure 2** — PaCMAP vs. t-SNE on 784-dim Fashion-MNIST projected to 3D
- **Figure 3** — The three PaCMAP pair types (NN / MN / FP) on a rotating 3D Swiss roll
- **The PaCMAP loss** — KaTeX-rendered with intuition for each of the three terms
- **Figure 4** — Mammoth PaCMAP with `n_neighbors`, `MN_ratio`, and `FP_ratio` sliders
- **Figure 5** — Animated PaCMAP on 24 toy datasets
- **Figure 6** — Hyperparameter grid of PaCMAP across `n_neighbors × MN_ratio`
- **Figure 7** — Random-seed stability comparison across UMAP / t-SNE / PaCMAP
- **Figures 8, 9, 10, 11** — Extensions: LocalMAP, ParamRepulsor, RashomonDR (with the Common Knowledge PaCMAP consensus)

The article stands on its own — no reading order required. Start with the mammoth if you want to see the pay-off, or jump to *How PaCMAP works* for the algorithm.
