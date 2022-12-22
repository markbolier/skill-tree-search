import * as Styled from "./SearchBar.styled";

interface SearchBarProps {
  handleInput: any;
}

export const SearchBar = ({ handleInput }: SearchBarProps) => {
  return <Styled.Input onChange={handleInput} placeholder="Search..." type="text" />;
};

export default SearchBar;
