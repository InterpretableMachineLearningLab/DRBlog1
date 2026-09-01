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
  description:
    "The Interpretable Machine Learning Lab at Duke University, led by Cynthia Rudin. We build models that people can actually understand — sparse decision rules, interpretable neural networks, and dimensionality reduction methods that preserve real structure.",
  url: "https://interpretablemachinelearninglab.github.io",
  author: {
    name: "Interpretable ML Lab",
    bio: "Cynthia Rudin's research group at Duke University, working on interpretable models for high-stakes decisions.",
    url: "https://users.cs.duke.edu/~cynthia/home.html",
  },
  social: {
    github: "https://github.com/InterpretableMachineLearningLab",
    rss: "/rss.xml",
  },
} as const;
