import styled from "styled-components";

export const Button = styled.li`
  cursor: pointer;
  text-align: center;
  padding: 8px;

  &:hover {
    color: blue;
    text-decoration: underline;
  }
`;

export const Container = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: auto;
  max-width: 800px;
  padding: 10px;
  width: fit-content;
`;

export const Number = styled.a<{
  currentPage?: number;
  pageNumber?: number;
}>`
  color: ${(props) => (props.currentPage === props.pageNumber ? "blue" : null)};
`;
