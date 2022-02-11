import { Link } from 'gatsby';
import React from 'react';

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  // make more vars
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log('🙇‍♂️ totalCount', typeof totalCount);
  console.log('🙇‍♂️ pageSize', typeof pageSize);
  console.log('🙇‍♂️ currentPage', typeof currentPage);

  const previousPage = 3 - 1;
  const nextPage = 2 + 1;
  // [TODO] Make currentPage work, comes in as undef
  // const previousPage = currentPage - 1;
  // const nextPage = currentPage + 1;

  return (
    <div>
      <Link to={`${base}/${previousPage}`}>'&ShortLeftArrow;'</Link>
      <Link to={`${base}/${nextPage}`}>"&ShortRightArrow;"</Link>
    </div>
  );
}
