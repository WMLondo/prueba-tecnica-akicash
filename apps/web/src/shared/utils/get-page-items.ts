export const getPageItems = (
  page: number,
  totalPages: number,
): Array<number | "ellipsis"> => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, page, page - 1, page + 1]);
  const sorted = [...pages]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((left, right) => left - right);

  const items: Array<number | "ellipsis"> = [];

  for (const value of sorted) {
    const previous = items.at(-1);
    if (typeof previous === "number" && value - previous > 1) {
      items.push("ellipsis");
    }
    items.push(value);
  }

  return items;
};
