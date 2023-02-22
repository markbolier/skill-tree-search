import styled from "styled-components";
import { ReactComponent as CloseSVG } from "../../assets/icons/close.svg";

export const CloseIcon = styled(CloseSVG)`
  height: 7px;
  padding-left: 5px;
`;

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
  align-items: center;
  background-color: #f1edeb;
  border-radius: 5px;
  border: none;
  color: black;
  display: flex;
  flex-wrap: nowrap;
  font-size: 0.9rem;
  font-weight: 400;
  margin: 6px 1px 6px 6px;
  padding: 5px;
  width: fit-content;

  &:hover {
    background-color: #cec8c4;
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
