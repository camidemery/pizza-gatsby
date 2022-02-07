import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

const SlicemasterGridStyled = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyled = styled.div`
  a {
    text-decoration: none;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;
    background: var(--yellow);
    transform: rotate(1deg);
    text-align: center;
  }
`;
export default function SliceMastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <SlicemasterGridStyled>
        {slicemasters.map((person) => (
          <SlicemasterStyled>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <GatsbyImage
              image={person.image.asset.gatsbyImageData}
              alt={person.name}
              imgStyle={{ height: '400px' }}
            />
            <p className="description">{person.description}</p>
          </SlicemasterStyled>
        ))}
      </SlicemasterGridStyled>
    </>
  );
}

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            gatsbyImageData(width: 410)
          }
        }
      }
    }
  }
`;
