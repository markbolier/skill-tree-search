import * as Styled from "./SearchBar.styled";

interface SearchBarProps {
  // todo type the props
  handleInput: any;
  query: any;
}

export const SearchBar = ({ handleInput, query }: SearchBarProps) => {
  return <Styled.Input value={query} onChange={handleInput} placeholder="Search..." type="text" />;
};
