import styled from "styled-components";

export const List = styled.li`
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

export const Label = styled.button`
  background-color: #f1edeb;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 400;
  margin: 5px 0;
  padding: 5px;
  width: fit-content;

  &:hover {
    background-color: #cec8c4;
  }
`;

export const Description = styled.p`
  font-size: 0.9rem;
  margin: 0;
  padding: 0;
`;
