// dynamically create pages
// after initial sourcing of data, you can query data and create pages

exports.createPages = async function turnPizzasIntoPages({ graphql, actions }) {
  // get template
  const pizzaTemplate = require.resolve('./src/templates/Pizza.js');
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
};

exports.createPages = async function turnToppingsIntoPages({
  graphql,
  actions,
}) {
  // get template
  const toppingTemplate = require.resolve('./src/pages/pizzas.js');
  // query all toppigs
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // create page for the topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
};
// pass topping data to pizza.js
