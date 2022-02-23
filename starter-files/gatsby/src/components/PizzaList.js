import { Link } from 'gatsby';
import React from 'react';
import SanityImage from 'gatsby-plugin-sanity-image';

import styled from '@emotion/styled';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-content: center;
  gap: 4rem;
  /* grid-auto-columns: 105; */
  grid-auto-rows: auto auto 200px;
`;

const PizzaStyles = styled.div`
  display: grid;
  text-align: center;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto 4rem 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  /* each of these elements spans 3 rows in the grid */
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
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
      <SanityImage
        {...pizza.image}
        alt={pizza.name}
        style={{
          width: '100%',
          height: '20rem',
          objectFit: 'cover',
        }}
      />
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
