import * as Styled from "./SearchBar.styled";

export const SearchBar = (props: any) => {
  return <Styled.Input onChange={props.handleInput} placeholder="Search..." type="text" />;
};

export default SearchBar;
