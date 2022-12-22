import styled from "styled-components";

export const Input = styled.input`
  border-radius: 5px;
  border: 1px solid grey;
  font-size: 15px;
  margin: 0px 10px 20px 10px;
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
