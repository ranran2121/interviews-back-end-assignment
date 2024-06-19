import { productList } from "../mocks/productList";

export function getProductsList(
  page: number,
  limit: number,
  category: string,
  search: string
) {
  const filteredList = productList.filter((item) => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (category && item.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    return true;
  });

  const pagedList = filteredList.slice(page * limit, (page + 1) * limit);

  return { pagedList, total: filteredList.length };
}
