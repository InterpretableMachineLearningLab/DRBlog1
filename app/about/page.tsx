import type { Metadata } from "next";
import { PageShell, bodyCopy } from "@/components/PageShell";
import { ProvenanceNotice } from "@/components/ProvenanceNotice";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Interpretable Machine Learning Lab at Duke University, whose PI is Cynthia Rudin. Sparse models, interpretable neural networks, interpretable matching for causal inference, and dimension reduction for data visualization.",
  openGraph: {
    title: "About | Interpretable ML Lab",
    description:
      "The Interpretable Machine Learning Lab at Duke University, whose PI is Cynthia Rudin.",
    url: "/about",
    type: "website",
  },
};

const HOME = site.provenance.piUrl;
const LAB = site.provenance.officialUrl;

const linkClass =
  "font-medium text-indigo-600 hover:underline dark:text-indigo-400";

/**
 * Everything on this page is drawn from the PI's own homepage and lab page,
 * which are linked throughout. Where the wording matters it is quoted rather
 * than paraphrased, because this page describes someone else's research
 * so it should not put positions in their mouth.
 */
export default function AboutPage() {
  return (
    <PageShell>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
        Models whose reasoning people can{" "}
        <span className="text-indigo-600 dark:text-indigo-400">
          actually understand.
        </span>
      </h1>

      <div
        className={`mt-8 space-y-6 ${bodyCopy} text-zinc-600 dark:text-zinc-400`}
      >
        <p>
          The Interpretable Machine Learning Lab is the research group of{" "}
          <a
            href={HOME}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Cynthia Rudin
          </a>
          , Gilbert, Louis, and Edward Lehrman Distinguished Professor of
          Computer Science at Duke University, with appointments in Computer
          Science, Electrical and Computer Engineering, Statistical Science,
          Mathematics, and Biostatistics &amp; Bioinformatics.
        </p>
        <p>
          She describes the lab&apos;s focus as{" "}
          <em>
            &ldquo;interpretable machine learning and its applications; that
            is, designing machine learning models whose reasoning processes
            people can understand&rdquo;
          </em>
          . That covers sparse models, interpretable neural networks,
          interpretable matching methods for causal inference, and dimension
          reduction for data visualization, applied to problems in
          healthcare, criminal justice, materials science and computer
          vision.
        </p>
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">
          What the lab works on
        </h2>
        <ul
          className={`mt-6 space-y-4 ${bodyCopy} text-zinc-600 dark:text-zinc-400`}
        >
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              Sparse models.
            </strong>{" "}
            Decision lists, decision trees and additive models that provably
            optimise accuracy and sparsity, plus optimal scoring systems:
            sparse linear models with integer coefficients.
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              Interpretable neural networks.
            </strong>{" "}
            Architectures whose reasoning is inspectable rather than explained
            after the fact.
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              Interpretable causal inference.
            </strong>{" "}
            Matching methods, developed in the{" "}
            <a
              href="https://almost-matching-exactly.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Almost-Matching-Exactly Lab
            </a>
            .
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              The Rashomon set.
            </strong>{" "}
            A paradigm in which, as Rudin puts it,{" "}
            <em>
              &ldquo;ML algorithms return many good models and the user can
              choose among them&rdquo;
            </em>
            . This is the subject of her ICML 2024 spotlight, &ldquo;Amazing
            Things Come From Having Many Good Models.&rdquo; A related line of work
            asks why simple models so often suffice; the lab&apos;s hypothesis
            is that{" "}
            <em>
              &ldquo;noise in the data leads to the existence of simpler
              models&rdquo;
            </em>
            , proved in special cases.
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              Dimension reduction.
            </strong>{" "}
            PaCMAP and its successors. Rudin&apos;s homepage notes that PaCMAP
            is{" "}
            <em>
              &ldquo;used by many scientists, particularly in bioinformatics,
              biology, and ecology&rdquo;
            </em>{" "}
            and has won two software awards from the American Statistical
            Association. The{" "}
            <a href="/articles/understanding-pacmap/" className={linkClass}>
              interactive PaCMAP article
            </a>{" "}
            is a tour of how it works.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">
          Where it has been used
        </h2>
        <ul
          className={`mt-6 space-y-4 ${bodyCopy} text-zinc-600 dark:text-zinc-400`}
        >
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              Seizure prediction in ICU patients.
            </strong>{" "}
            Built on optimal scoring systems and awarded the 2019 INFORMS
            Innovative Applications in Analytics Award. Rudin describes it as{" "}
            <em>
              &ldquo;the only AI model currently widely used in critical care
              brain monitoring&rdquo;
            </em>
            .
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              Power-grid reliability.
            </strong>{" "}
            The first major effort to maintain an underground electrical
            distribution network with machine learning, with Con Edison in New
            York City, and winner of the 2013 INFORMS Innovative
            Applications in Analytics Award.
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              Crime-series detection.
            </strong>{" "}
            The Series Finder algorithm, developed in Cambridge,
            Massachusetts, and adapted by the NYPD as Patternizr, running live
            in New York since 2016.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">
          Selected recognition
        </h2>
        <ul
          className={`mt-6 space-y-4 ${bodyCopy} text-zinc-600 dark:text-zinc-400`}
        >
          <li>IJCAI-25 John McCarthy Award, 2025.</li>
          <li>
            Squirrel AI Award for Artificial Intelligence for the Benefit of
            Humanity, AAAI, 2022.
          </li>
          <li>Guggenheim Fellowship, 2022.</li>
        </ul>
        <p className={`mt-6 ${bodyCopy} text-zinc-600 dark:text-zinc-400`}>
          Her{" "}
          <a
            href={HOME}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            homepage
          </a>{" "}
          has the full award list, biography and publications; the{" "}
          <a
            href={LAB}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            lab page
          </a>{" "}
          has the current roster.
        </p>
      </section>

      {!site.provenance.reviewed && (
        <section className="mt-14 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700/60">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">
            About this site
          </h2>
          <p className={`mt-4 ${bodyCopy} text-zinc-600 dark:text-zinc-400`}>
            This is a GitHub Pages site built by lab members to host
            interactive write-ups of the lab&apos;s work. It is not an
            official Duke or lab page, and its contents have not been reviewed
            or endorsed by the lab&apos;s PI. Everything on this page is drawn
            from the public pages linked above; anything that misrepresents
            the lab is this site&apos;s error, not the lab&apos;s.
          </p>
          <ProvenanceNotice className="mt-4" />
        </section>
      )}
    </PageShell>
  );
}
