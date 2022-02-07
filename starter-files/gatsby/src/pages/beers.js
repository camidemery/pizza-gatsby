import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import React from 'react';

const BeerGridStyled = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const BeerCardStyled = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    /* display: grid; */
    align-items: center;
    font-size: 10px;
    color: black;
    padding-bottom: 1rem;
  }
  display: grid;
  grid-template-rows: auto 2fr 1fr 1fr;
  p {
    margin: 0;
  }
`;

export default function BeersPage({ data: { beers } }) {
  return (
    <>
      <h2 className="center">
        We have {beers.nodes.length} beers for Dine In Only!
      </h2>
      <BeerGridStyled>
        {beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <BeerCardStyled key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              {/* StaticImage cant take in props and GatsbyImage cannot take in URLs */}
              {/* <StaticImage src={beer.image} alt={beer.name} /> */}
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`🌟`.repeat(rating)}
                <span style={{ filter: 'grayscale(100%)' }}>
                  {`🌟`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </BeerCardStyled>
          );
        })}
      </BeerGridStyled>
    </>
  );
}

// query data
// loop over it
// display it

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
