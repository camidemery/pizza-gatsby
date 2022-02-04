import { Link } from 'gatsby';
import React from 'react';

import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: center;
  gap: 4rem;
  /* grid-auto-columns: 105; */
  grid-auto-rows: auto auto 200px;
`;

const PizzaStyles = styled.div`
  display: grid;
  // take your row sizing, not from pizza styles div
  // but from the grid styles
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  /* check if --rows exists, and if not use subgrid */
  grid-template-rows: var(---rows, subgrid);
  /* each of these elements spans 3 rows in the grid */
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <GatsbyImage image={pizza.image.asset.gatsbyImageData} alt={pizza.name} />
    </PizzaStyles>
  );
}
export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}
