import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';
import React from 'react';
import SanityImage from 'gatsby-plugin-sanity-image';
import Pagination from '../components/Pagination';

const SlicemasterGridStyled = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyled = styled.div`
  display: flex;
  flex-direction: column;
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
// if you are going to use the pageContext, you have to destructure it
export default function SliceMastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slice-masters"
      />
      <SlicemasterGridStyled>
        {slicemasters.map((person) => (
          <SlicemasterStyled key={person.id}>
            <Link to={`/slice-masters/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <SanityImage
              {...person.image}
              alt={person.name}
              style={{
                height: '400px',
                objectFit: 'cover',
              }}
            />
            <p className="description">{person.description}</p>
          </SlicemasterStyled>
        ))}
      </SlicemasterGridStyled>
    </>
  );
}

export const query = graphql`
  query ($skip: Int = 0, $pageSize: Int = 4) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          ...ImageWithPreview
        }
      }
    }
  }
`;
