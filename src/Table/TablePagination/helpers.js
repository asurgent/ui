const pageNumbersList = (currentPage, delta, totalPages) => {
  const length = Math.max(0, Math.min(totalPages, delta));
  const pageItem = (value, clickable = true) => ({ value, clickable });
  const pageNumbers = (num, lenghtModifer = length) => Array
    .from({ length: lenghtModifer }, (_, i) => pageItem(num + i));

  if (delta >= totalPages) {
    const pages = pageNumbers(1);
    return [...pages];
  }

  if (currentPage < delta) {
    const pages = pageNumbers(1);
    return [...pages, pageItem(totalPages)];
  } if (totalPages < (currentPage + delta - 1)) {
    const val = totalPages - delta + 1;
    const pages = pageNumbers(val);
    return [pageItem(1), ...pages];
  }

  const padding = Math.round((delta / 2));
  const pageBase = currentPage - padding + 1;
  const pages = pageNumbers(pageBase, length - 1);
  return [pageItem(1), ...pages, pageItem(totalPages)];
};

const pagination = (currentPage, totalPages, delta) => {
  if (totalPages <= 1) {
    return [];
  }

  const ELLIPSIS = '...';
  return pageNumbersList(currentPage, delta, totalPages)
    .reduce((acc, page, index, origin) => {
      acc.push(page);
      const nextItem = origin[index + 1];
      if (nextItem && (nextItem.value - page.value) > 1) {
        acc.push({ value: ELLIPSIS, clickable: false });
      }

      return acc;
    }, []);
};

export default pagination;
