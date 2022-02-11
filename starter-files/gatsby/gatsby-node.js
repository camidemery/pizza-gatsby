require('dotenv').config({
  path: `.env`,
});

const fetch = require(`node-fetch`);
// dynamically create pages
// after initial sourcing of data, you can query data and create pages

exports.createPages = async function turnPizzasIntoPages({ graphql, actions }) {
  // get template
  const pizzaTemplate = require.resolve('./src/templates/Pizza.js');
  const toppingTemplate = require.resolve('./src/pages/pizzas.js');
  const slicemastersTemplate = require.resolve('./src/pages/slice-masters.js');

  // query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          slug {
            current
          }
          name
          id
        }
      }
    }
  `);
  console.log(data);
  // loop over each pizza to create a page
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // url
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      // pass topping data to pizza.js
      context: {
        topping: topping.name,
        // regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });

  // slicemasters pages
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  console.log('🧘‍♂️', typeof pageSize);
  console.log('🧘‍♂️', pageSize);

  const pageCount = Math.ceil(10 / pageSize);
  console.log('🤾‍♂️', pageCount);
  // [TODO] Fix totalCount coming in correctly
  // const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slice-masters/${i + 1}`,
      component: slicemastersTemplate,
      // data passed to the page
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
};

// sourcing nodes from an api
// done on build time, not live
exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  // fetch list of beers
  const results = await fetch(`https://api.sampleapis.com/beers/ale`);
  const beers = await results.json();
  // loop over beers
  for (const beer of beers) {
    // create nodes for each beers
    createNode({
      price: beer.price,
      name: beer.name,
      rating: beer.rating,
      image: beer.image,
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        // what it will be called in graphql
        type: `Beer`,
        // in case other plugins are querying on this data
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    });
  }
};
