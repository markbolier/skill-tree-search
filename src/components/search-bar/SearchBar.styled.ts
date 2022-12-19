import styled from "styled-components";

export const Input = styled.input`
  border: 1px solid grey;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 10px;
  width: fill-available;
  font-size: 15px;

  &:hover {
    border: 1px solid #ea650d;
  }

  &:focus {
    outline: none;
    border: 2px solid #ea650d;
    margin: 9px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 1.4rem;
  color: #ea650d;
  margin: 0;
  padding: 0;
`;

export const Label = styled.h3`
  font-size: 1rem;
  margin: 0;
  padding: 0;
  color: #999;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  margin: 0;
  padding: 0;
`;
