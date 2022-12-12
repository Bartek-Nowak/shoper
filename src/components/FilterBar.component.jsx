import { SELECT_CATEGORY } from "../const";

function SelectFilter({ options, name, handleOnChange }) {
  return (
    <select
      name={name}
      onChange={(e) => {
        handleOnChange((draft) => {
          draft[name] = e.target.value;
        });
      }}
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function FilterBar({ setFilters }) {
  return (
    <div>
      <SelectFilter
        options={SELECT_CATEGORY}
        name="brand"
        handleOnChange={setFilters}
      />
    </div>
  );
}
