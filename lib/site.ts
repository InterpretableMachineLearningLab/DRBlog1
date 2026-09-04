/**
 * Site-wide configuration for the Interpretable ML Lab blog.
 *
 * Every page, the RSS feed and the sitemap read from here. The build script
 * keeps its own copy in scripts/rss.mjs; update that too if you change the
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
  /** The lab this site belongs to, and its PI. */
  lab: {
    officialUrl: "https://users.cs.duke.edu/~cynthia/lab.html",
    piUrl: "https://users.cs.duke.edu/~cynthia/home.html",
    piName: "Cynthia Rudin",
  },
  social: {
    github: "https://github.com/InterpretableMachineLearningLab",
    rss: "/rss.xml",
  },
} as const;
