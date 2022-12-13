import { useEffect } from "react";
import { useImmer } from "use-immer";
import { ALL_SELECT, LOAD_LIMIT } from "../../const";
import { useFetch } from "../../hooks/useFetch";
import FilterBar from "../filter-bar/FilterBar.component";
import ProductsList from "../products-list/ProductsList";
import LoadMoreButton from "../load-more-button/LoadMoreButton.component";
import Error from "../error/Error.components";
import { filterElements } from "../../functions/filterElements";
import "./FilteredProductsList.scss";

export default function FilteredProductsList() {
  const [filters, setFilters] = useImmer({
    brand: ALL_SELECT.value,
    category: ALL_SELECT.value,
  });

  const { data: products, setData: setProducts } = useFetch(`products?`);

  const url = `${
    filters.category !== ALL_SELECT.value ? `category=${filters.category}&` : ""
  }${filters.brand !== ALL_SELECT.value ? `brand=${filters.brand}&` : ""}`;
  

  useEffect(() => {
    setProducts((draft) => {
      draft.slug = url;
      draft.dataLimit = LOAD_LIMIT;
      draft.isLoading = true;
    });
  }, [filters.category, filters.brand]);

  if (products.errorMessage) {
    return <Error error={products.errorMessage} />;
  } else {
    return (
      <div className="filtered_products">
        <FilterBar setFilters={setFilters} />
        {!products.isLoading && (
          <ProductsList products={filterElements(products.data, filters)} />
        )}
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
