import styled from "styled-components";

export const AutocompleteDropdown = styled.div`
  display: flex;
  font-size: 15px;
`;

export const AutocompleteList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const AutocompleteItem = styled.li<{
  focusIndex: number;
  suggestionIndex: number;
}>`
  background-color: ${(props) =>
    props.suggestionIndex === props.focusIndex && props.focusIndex > -1 ? "lightgrey" : null};
  color: black;
  cursor: default;
  padding: 10px;

  &:hover {
    background-color: lightgrey;
  }
`;
