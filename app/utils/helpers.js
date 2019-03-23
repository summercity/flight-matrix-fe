import { drop } from 'lodash';
export function paginatedData(items, page, pageSize) {
  const pg = page || 1;

  const pgSize = pageSize || 100;

  const offset = (pg - 1) * pgSize;

  const pagedItems = drop(items, offset).slice(0, pgSize);
  return {
    page: pg,
    pageSize: pgSize,
    total: items.length,
    totalPages: Math.ceil(items.length / pgSize) || 0,
    data: pagedItems,
  };
}
