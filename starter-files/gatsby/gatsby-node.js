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
    });
  });
}
// export async function createPages(params) {
//   console.log('CREATING PEGSS');
//   // create pages dynamically
//   // pizzas
//   // need to await because the load will take a couple of seconds
//   await turnPizzasIntoPages(params);
//   // toppings
//   // slicemasters
// }
