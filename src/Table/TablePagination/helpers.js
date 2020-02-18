const ELLIPSIS = '...';

// Genreates an array with ellipsis and the total range of pagination items based
// on current page, total pages and the delta (how many pages before we start to use ellipsis)
const pageNumbersList = (currentPage, totalPages, delta) => {
  const current = Math.max(0, Math.min(totalPages, currentPage));
  const length = Math.max(0, Math.min(totalPages, delta)); // Max lenght is delta. By default its' 5

  // Helper functions that create objects and pagination arrays
  const pageItem = (value, clickable = true) => ({ value, clickable });
  const pageNumbers = (num, lenghtModifer = length) => Array
    .from({ length: lenghtModifer }, (_, i) => pageItem(num + i));

  // If the number of pages are equal or less than
  // the delta. We dont need any ellipsis magic.
  if (delta >= totalPages) {
    const pages = pageNumbers(1);
    return [...pages];
  }

  // Here there are more pages than the delta. So, we will need ellipsis.

  // Here we will return the numbers before the first ellipsis
  // Eg:
  // pageNumbers(1) => [(1),2,3,4,5] (Max-lenght is delta, thats why we only get 5-items)
  // pageItem(10) => 10
  // result > [(1),2,3,4,5,10]
  if (current < delta) {
    const pages = pageNumbers(1);
    return [...pages, pageItem(totalPages)];
  }
  // Here we will return the numbers after the second ellipsis
  // Eg:
  // pageItem(1) => 1
  // pageNumbers(10 - delta + 1) => [6,7,8,9,10] (Max-lenght is delta, thats why we only get 5-items)
  // result > [1,6,7,(8),9,10]
  if (totalPages < (current + delta - 1)) {
    const val = totalPages - delta + 1;
    const pages = pageNumbers(val);
    return [pageItem(1), ...pages];
  }

  // Here we are in between both ellipsis
  // Eg:
  // pageItem(1) => 1
  // pageNumbers() => [10,11,12,13,14] (Max-lenght is delta, thats why we only get 5-items)
  // pageItem(20) => 20
  // result > [1,10,11,(12),13,14,20]
  const padding = Math.round((delta / 2));
  const pageBase = current - padding + 1;
  const pages = pageNumbers(pageBase, length - 1);
  return [pageItem(1), ...pages, pageItem(totalPages)];
};

const pagination = (currentPage, totalPages, delta) => {
  if (totalPages <= 1) {
    return [];
  }

  // Loop trough the generated list. If we see that the next value in
  // the array has a value greater than one of its own eg. [1,10...].
  // Then we know that an ellipsis should be placed between 1 & 10 in the array
  return pageNumbersList(currentPage, totalPages, delta)
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
