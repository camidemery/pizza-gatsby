import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    border-radius: 2px;
    background: var(--grey);
    padding: 5px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;
function countPizzasInToppings(pizzas) {
  // return pizza counts
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      // if it is, add one, else add entry to acc
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort based on counts
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}
// we will be using a static query here with react hook
export default function ToppingsFilter() {
  const { toppings, pizzas } = useStaticQuery(graphql`
    # // get a list of all toppings
    # // list of all pizzas with toppings
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegitarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // count pizzzas w each toppings
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  // loop over display of toppings
  return (
    <ToppingsStyles>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
