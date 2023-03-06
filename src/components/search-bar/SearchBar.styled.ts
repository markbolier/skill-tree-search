import styled from "styled-components";
import { ReactComponent as CloseSVG } from "../../assets/icons/close.svg";

export const CloseIcon = styled(CloseSVG)`
  display: none;
  height: 7px;
  padding-left: 5px;
`;

export const Container = styled.div`
  margin-bottom: 80px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: fill-available;
`;

export const Input = styled.input`
  border-radius: 10px;
  border: none;
  flex-grow: 1;
  font-size: 15px;
  padding: 10px;

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
    ${CloseIcon} {
      display: inline-block;
    }
  }
`;

export const SearchBar = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  overflow: hidden;
  position: absolute;
  width: 100%;
`;

export const SearchIcon = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  margin: 0 5px 0 10px;
`;

export const Wrapper = styled.div`
  display: flex;
`;
