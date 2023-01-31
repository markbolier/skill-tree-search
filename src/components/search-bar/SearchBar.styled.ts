import styled from "styled-components";

export const Input = styled.input`
  border-radius: 5px;
  border: 1px solid grey;
  display: flex;
  font-size: 15px;
  padding: 5px 10px;
  width: fill-available;

  &:hover {
    border: 1px solid #ea650d;
  }

  &:focus {
    border: 1px solid #ea650d;
    outline: 1px solid #ea650d;
  }
`;

export const SearchBarContainer = styled.div`
  margin: 0 10px 20px 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
