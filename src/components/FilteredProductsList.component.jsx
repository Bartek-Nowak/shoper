import { useImmer } from "use-immer";
import FilterBar from "./FilterBar.component";

export default function FilteredProductsList() {
  const [filters, setFilters] = useImmer({
    brand: "",
    category: "",
  });
  console.log(filters)
  return (
    <div>
      <FilterBar setFilters={setFilters} />
    </div>
  );
}
