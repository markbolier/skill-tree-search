import styled from "styled-components";

export const Input = styled.input`
  border-radius: 10px;
  border: none;
  font-size: 15px;
  padding: 10px;
  width: 100%;

  &:focus,
  :focus-visible,
  :focus-within {
    border: none;
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
  width: fill-available;
`;
