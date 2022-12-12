import { useImmer } from "use-immer";
import { ALL_SELECT } from "../const";
import { useFetch } from "../hooks/useFetch";
import FilterBar from "./FilterBar.component";
import ProductsList from "./ProductsList";

export default function FilteredProductsList() {
  const [filters, setFilters] = useImmer({
    brand: ALL_SELECT.value,
    category: ALL_SELECT.value,
  });
console.log(filters)
  const { data: products, setData: setProducts } =
    useFetch("products?_limit=5");

  function filterProducts() {
    return products.data.filter((product) => {
      if (
        filters.brand !== ALL_SELECT.value &&
        product.brand !== filters.brand
      ) {
        return false;
      }
      if (
        filters.category !== ALL_SELECT.value &&
        product.category !== filters.category
      ) {
        return false;
      }
      return true;
    });
  }

  return (
    <div>
      <FilterBar setFilters={setFilters} />
      {!products.isLoading && <ProductsList products={filterProducts()} />}
    </div>
  );
}

