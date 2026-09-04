/**
 * Site-wide configuration for the Interpretable ML Lab blog.
 *
 * Every page, the RSS feed and the sitemap read from here. The build script
 * keeps its own copy in scripts/rss.mjs — update that too if you change the
 * URL, name or title here.
 */
export const site = {
  name: "Interpretable ML Lab",
  title: "Interpretable Machine Learning Lab",
  // Tracks the lab's own description of its work on the PI's homepage rather
  // than paraphrasing it into something the lab has not said.
  description:
    "Interactive write-ups from the Interpretable Machine Learning Lab at Duke University, whose PI is Cynthia Rudin. The lab designs machine learning models whose reasoning processes people can understand: extremely sparse models, interpretable neural networks, interpretable matching methods for causal inference, and dimension reduction for data visualization.",
  url: "https://interpretablemachinelearninglab.github.io",
  author: {
    name: "Interpretable ML Lab",
    bio: "Interactive write-ups of work from Cynthia Rudin's research group at Duke University.",
    url: "https://users.cs.duke.edu/~cynthia/lab.html",
  },
  /**
   * Whose site this is, stated on the site itself.
   *
   * This is a GitHub Pages site under the lab's name, and until the PI has
   * signed off on it, saying so is the honest thing to do — a reader landing
   * here should not have to guess whether Cynthia Rudin wrote or approved
   * this. Set `reviewed: true` once she has, and the notice disappears
   * everywhere it is rendered.
   */
  provenance: {
    reviewed: false,
    officialUrl: "https://users.cs.duke.edu/~cynthia/lab.html",
    piUrl: "https://users.cs.duke.edu/~cynthia/home.html",
    piName: "Cynthia Rudin",
    notice:
      "An unofficial site, built and maintained by lab members. Not reviewed or endorsed by the lab's PI.",
  },
  social: {
    github: "https://github.com/InterpretableMachineLearningLab",
    rss: "/rss.xml",
  },
} as const;
