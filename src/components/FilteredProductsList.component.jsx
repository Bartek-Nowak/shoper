import { useEffect } from "react";
import { useImmer } from "use-immer";
import { ALL_SELECT, LOAD_LIMIT } from "../const";
import { useFetch } from "../hooks/useFetch";
import EndProduct from "./EndProducts.component";
import FilterBar from "./FilterBar.component";
import Loading from "./Loading.component";
import ProductsList from "./ProductsList";
import Error from "./Error.components";

function LoadMoreButton({ loading, end, handleOnClick }) {
  if (loading) {
    return <Loading />;
  } else if (end) {
    return <EndProduct />;
  } else {
    return <button onClick={handleOnClick}>Load more</button>;
  }
}

export default function FilteredProductsList() {
  const [filters, setFilters] = useImmer({
    brand: ALL_SELECT.value,
    category: ALL_SELECT.value,
  });

  const { data: products, setData: setProducts } = useFetch(`products?`);

  const url = `${
    filters.category !== ALL_SELECT.value ? `category=${filters.category}&` : ""
  }${filters.brand !== ALL_SELECT.value ? `?brand=${filters.brand}&` : ""}`;

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
  useEffect(() => {
    setProducts((draft) => {
      draft.slug = url;
      draft.dataLimit = LOAD_LIMIT;
    });
  }, [filters.category]);

  if (products.errorMessage) {
    return <Error error={products.errorMessage} />;
  } else {
    return (
      <div>
        <FilterBar setFilters={setFilters} />
        {!products.isLoading && <ProductsList products={filterProducts()} />}
        <LoadMoreButton
          loading={products.isLoading}
          end={products.dataEnd}
          handleOnClick={() => {
            setProducts((draft) => {
              draft.dataLimit += LOAD_LIMIT;
            });
          }}
        />
      </div>
    );
  }
}
