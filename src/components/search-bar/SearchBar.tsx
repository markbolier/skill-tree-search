import { ClearInputButton } from "../clear-input-button";
import { TypeaheadDropdown } from "../typeahead-dropdown";
import * as Styled from "./SearchBar.styled";

interface SearchBarProps {
  // TODO type data en updateInput
  clearInput: () => void;
  data: any;
  handleInput: (event: React.FormEvent<HTMLInputElement>) => void;
  query: string;
  updateInput: (event: any) => void;
}

export const SearchBar = ({
  clearInput,
  data,
  handleInput,
  query,
  updateInput,
}: SearchBarProps) => {
  return (
    <Styled.SearchBarContainer>
      <Styled.Input value={query} onChange={handleInput} placeholder="Search..." type="text" />
      {query !== "" && <TypeaheadDropdown data={data} query={query} updateInput={updateInput} />}
      {query !== "" && <ClearInputButton clearInput={clearInput} />}
    </Styled.SearchBarContainer>
  );
};
