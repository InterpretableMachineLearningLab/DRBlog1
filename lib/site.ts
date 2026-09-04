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
  description:
    "Interactive write-ups from the Duke Interpretable Machine Learning Lab, which designs machine learning models whose reasoning processes people can understand: extremely sparse models, interpretable neural networks, interpretable matching methods for causal inference, and dimension reduction for data visualization.",
  url: "https://interpretablemachinelearninglab.github.io",
  author: {
    name: "Interpretable ML Lab",
    bio: "Interactive write-ups from the Duke Interpretable Machine Learning Lab.",
  },
  social: {
    github: "https://github.com/InterpretableMachineLearningLab",
    rss: "/rss.xml",
  },
} as const;
