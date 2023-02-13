import { TypeaheadDropdown } from "../typeahead-dropdown";
import { useRef } from "react";
import * as Styled from "./SearchBar.styled";

interface SearchBarProps {
  // TODO type data en updateInput
  data: any;
  handleInput: (event: React.FormEvent<HTMLInputElement>) => void;
  query: string;
  updateInput: (event: any) => void;
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
