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

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const Title = styled.h2`
  color: #ea650d;
  font-size: 1.4rem;
  margin: 0;
  padding: 0;
`;

export const Label = styled.h3`
  color: #999;
  font-size: 1rem;
  margin: 0;
  padding: 0;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  margin: 0;
  padding: 0;
`;
