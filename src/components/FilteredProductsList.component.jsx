import { useImmer } from "use-immer";
import { useFetch } from "../hooks/useFetch";
import FilterBar from "./FilterBar.component";
import ProductsList from "./ProductsList";

export default function FilteredProductsList() {
  const [filters, setFilters] = useImmer({
    brand: "",
    category: "",
  });
  const { data: products, setData: setProducts } = useFetch('products');
  return (
    <div>
      <FilterBar setFilters={setFilters} />
      {!products.isLoading && <ProductsList products={products.data} />}
    </div>
  );
}
