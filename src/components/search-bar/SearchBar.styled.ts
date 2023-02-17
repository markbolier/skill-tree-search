import styled from "styled-components";

export const Input = styled.input`
  border-radius: 10px;
  border: none;
  font-size: 15px;
  padding: 10px;
  flex-grow: 1;

  &:focus,
  :focus-visible,
  :focus-within {
    outline: none;
  }
`;

export const Label = styled.button`
  background-color: #f1edeb;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 400;
  margin: 6px 1px 6px 6px;
  padding: 5px;
  width: fit-content;

  &:hover {
    background-color: lightgrey;
    outline: 1px solid grey;
  }

  &:active {
    background-color: grey;
    outline: none;
  }
`;

export const SearchBarContainer = styled.div`
  border-radius: 10px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  margin: 0 10px 30px 10px;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  display: flex;
`;
