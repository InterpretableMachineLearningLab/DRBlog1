import type { Metadata } from "next";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Interpretable Machine Learning Lab at Duke University, led by Cynthia Rudin. Research on sparse models, interpretable neural networks, dimensionality reduction, and high-stakes decision-making.",
  openGraph: {
    title: "About — Interpretable ML Lab",
    description:
      "The Interpretable Machine Learning Lab at Duke University, led by Cynthia Rudin.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
        Models people can{" "}
        <span className="text-indigo-600 dark:text-indigo-400">
          actually understand.
        </span>
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p>
          The Interpretable Machine Learning Lab is{" "}
          <a
            href="https://users.cs.duke.edu/~cynthia/home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Cynthia Rudin&apos;s
          </a>{" "}
          research group at Duke University. We work on machine learning that
          is transparent by construction — models whose reasoning a human
          can inspect, argue with, and trust — because the most consequential
          places we deploy ML (healthcare, criminal justice, credit,
          scientific discovery) are exactly the places where a black box is
          the wrong answer.
        </p>
        <p>
          Interpretability, in our view, is not a post-hoc explanation
          attached to an opaque model. It is a property of the model itself
          — sparsity, monotonicity, additivity, small trees, small rule
          sets, or a small handful of prototypes. The interesting question
          is how much accuracy that constraint really costs. Our repeated
          finding is: much less than the field assumes.
        </p>
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          What we work on
        </h2>
        <ul className="mt-6 space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              Sparse models.
            </strong>{" "}
            Optimal sparse decision lists and trees, generalised additive
            models, scoring systems for medical and criminal-justice risk
            assessment.
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              Interpretable neural networks.
            </strong>{" "}
            Prototype-based image classifiers (ProtoPNet and successors),
            neural additive models, concept-bottleneck architectures.
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              The Rashomon set.
            </strong>{" "}
            When many different models fit the data equally well, at least
            one of them tends to be simple and interpretable — we study how
            to find it, characterise it, and use its multiplicity.
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              Dimensionality reduction.
            </strong>{" "}
            PaCMAP, LocalMAP, ParamRepulsor, RashomonDR: fast, reproducible
            embeddings that preserve global structure by construction. See
            the{" "}
            <a
              href="/articles/understanding-pacmap/"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              interactive PaCMAP article
            </a>{" "}
            for the full tour.
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              High-stakes applications.
            </strong>{" "}
            Seizure prediction in ICU patients, crime-series detection,
            causal-inference matching, power-grid reliability, materials
            discovery. Each project pairs an interpretable model with a
            domain expert.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          More about the lab
        </h2>
        <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Cynthia Rudin holds the Gilbert, Louis and Edward Lehrman
          Distinguished Professorship at Duke. She was awarded the{" "}
          <em>2022 Squirrel AI Award for Artificial Intelligence for the
          Benefit of Humanity</em>, and the{" "}
          <em>2025 IJCAI John McCarthy Award</em>. Her{" "}
          <a
            href="https://users.cs.duke.edu/~cynthia/home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            homepage
          </a>{" "}
          has the full biography, publication list and lab-member roster.
        </p>
      </section>

      <div className="mt-10">
        <SocialLinks />
      </div>
    </div>
  );
}
