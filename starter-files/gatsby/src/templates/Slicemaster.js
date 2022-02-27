import { graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import SanityImage from 'gatsby-plugin-sanity-image';
import SEO from '../components/SEO';

const PersonGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const EffectButton = styled.div`
  width: 5rem;
  height: 2rem;
  border-radius: 100px;
  background: linear-gradient(#4b4b4b, #111111);
  box-shadow: inset 0.3rem 0 0.3rem #171717, inset -0.3rem 0 0.3rem #494949;
`;

export default function SingleSlicemasterPage({ data: { person } }) {
  return (
    <>
      <SEO title={`Slicemaster ${person.name}`} />
      <PersonGrid>
        <div className="center">
          <SanityImage
            {...person.image}
            alt={person.name}
            style={{
              height: '700px',
              objectFit: 'cover',
            }}
          />
          <h2>
            <span className="mark">{person.name}</span>
          </h2>
          <p>{person.description}</p>
          <EffectButton />
        </div>
      </PersonGrid>
    </>
  );
}

// this needs to be dynamic based on slug
// bang on string means it is required
export const query = graphql`
  query ($slicemasterID: String!) {
    person: sanityPerson(id: { eq: $slicemasterID }) {
      name
      id
      image {
        ...ImageWithPreview
      }
      description
    }
  }
`;
