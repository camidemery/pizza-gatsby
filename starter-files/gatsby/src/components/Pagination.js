import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';

const PaginationStyles = styled.div`
  display: flex;
  justify-items: center;
  border: 1px solid var(--grey);
  text-align: center;
  margin: 2rem 0;
  border-radius: 5px;
  & > * {
    text-decoration: none;
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = previousPage >= 1;

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${previousPage}`}>
        <span className="word">&#8592; Prev</span>
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          to={`${base}/${i > 0 ? i + 1 : ''}`}
          className={currentPage === 1 && i === 0 ? 'current' : ''}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        <span className="word">Next &#8594;</span>
      </Link>
    </PaginationStyles>
  );
}
