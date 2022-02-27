import { graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import SanityImage from 'gatsby-plugin-sanity-image';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

// destructuring the data to the individual pizza lvl
export default function SinglePizzaPage({ data: { pizza } }) {
  console.log('pizza image', pizza.image);
  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.metadata?.preview} />
      <PizzaGrid>
        <SanityImage {...pizza.image} alt={pizza.name} />
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
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
        ...ImageWithPreview
        ...Image
      }
      toppings {
        name
        id
        vegitarian
      }
    }
  }
`;
