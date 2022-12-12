import { useImmer } from "use-immer";
import { ALL_SELECT, LOAD_LIMIT } from "../const";
import { useFetch } from "../hooks/useFetch";
import FilterBar from "./FilterBar.component";
import ProductsList from "./ProductsList";

function LoadMoreButton({ loading, end, handleOnClick }) {
  
  if (loading) {
    return <p>Loading</p>;
  } else if (end) {
    return <button onClick={handleOnClick}>Load more</button>;
  }
}

export default function FilteredProductsList() {
  const [filters, setFilters] = useImmer({
    brand: ALL_SELECT.value,
    category: ALL_SELECT.value,
  });
  const url = `products`;

  const { data: products, setData: setProducts } = useFetch(url);

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
      <LoadMoreButton
        loading={products.isLoading}
        end={!products.dataEnd}
        handleOnClick={() => {
          setProducts((draft) => {
            draft.dataLimit += LOAD_LIMIT;
          });
        }}
      />
    </div>
  );
}
