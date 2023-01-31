import { TypeaheadDropdown } from "../typeahead-dropdown";
import * as Styled from "./SearchBar.styled";

interface SearchBarProps {
  // todo type the props
  data: any;
  handleInput: any;
  query: any;
}

export const SearchBar = ({ data, handleInput, query }: SearchBarProps) => {
  return (
    <>
      <Styled.Input value={query} onChange={handleInput} placeholder="Search..." type="text" />
      {query !== "" && <TypeaheadDropdown data={data} query={query} />}
    </>
  );
};
