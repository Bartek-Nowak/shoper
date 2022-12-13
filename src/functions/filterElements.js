import { ALL_SELECT } from "../const";

export function filterElements(elements,filters) {
  return elements.filter((element) => {
    if (filters.brand !== ALL_SELECT.value && element.brand !== filters.brand) {
      return false;
    }
    if (
      filters.category !== ALL_SELECT.value &&
      element.category !== filters.category
    ) {
      return false;
    }
    return true;
  });
}
