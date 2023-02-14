import { TypeaheadDropdown } from "../typeahead-dropdown";
import * as Styled from "./SearchBar.styled";

interface SearchBarProps {
  data: any;
  handleInput: (event: React.FormEvent<HTMLInputElement>) => void;
  query: string;
  updateInput: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ data, handleInput, query, updateInput }: SearchBarProps) => {
  return (
    <Styled.SearchBarContainer>
      <Styled.Input value={query} onChange={handleInput} placeholder="Search..." type="search" />
      {query !== "" && (
        <>
          <TypeaheadDropdown data={data} query={query} updateInput={updateInput} />
        </>
      )}
    </Styled.SearchBarContainer>
  );
};
