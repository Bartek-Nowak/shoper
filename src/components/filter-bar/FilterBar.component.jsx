import { ALL_SELECT, SELECT_CATEGORY } from "../../const";
import "./FilterBar.scss";
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
      <option value={ALL_SELECT.value}>{ALL_SELECT.name}</option>
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
    <div className="selectbar">
      <SelectFilter
        options={SELECT_CATEGORY}
        name="category"
        handleOnChange={setFilters}
      />
    </div>
  );
}
