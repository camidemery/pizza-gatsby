require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: 'Slicks Slices',
    siteUrl: 'https://gatsby.pizza',
    description: 'Best pizza place ever',
  },
  plugins: [
    // use a string if you want to use the defaults
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    // use an object if you need to pass through options
    {
      // resolve is always name of plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '2wf5fzem',
        dataset: 'production',
        // allows you to hot-update the db without deploying
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-sanity-image',
      options: {
        projectId: '2wf5fzem',
        dataset: 'production',
      },
    },
  ],
};
