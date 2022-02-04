import { graphql } from 'gatsby';
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';

const PizzaGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

// destructuring the data to the individual pizza lvl
export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <PizzaGrid>
      <GatsbyImage image={pizza.image.asset.gatsbyImageData} alt={pizza.name} />
      <div>
        <h2 className="mark">{pizza.name} PAGEEEEEE</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  );
}

// this needs to be dynamic based on slug
// bang on string means it is required
export const query = graphql`
  query ($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      toppings {
        name
        id
        vegitarian
      }
    }
  }
`;
