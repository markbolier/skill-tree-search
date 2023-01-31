import styled from "styled-components";

export const AutocompleteDropdown = styled.div`
  border-radius: 5px;
  border: 1px solid grey;
  display: flex;
  font-size: 15px;
`;

export const AutocompleteList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const AutocompleteItem = styled.li`
  color: black;
  cursor: default;
  margin: 0;
  padding: 5px 10px;

  &:hover {
    background-color: #ffe7db;
  }
`;
