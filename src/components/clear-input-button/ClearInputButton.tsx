import * as Styled from "./ClearInputButton.styled";

interface ClearInputButtonProps {
  clearInput: () => void;
}

export const ClearInputButton = ({ clearInput }: ClearInputButtonProps) => {
  return <Styled.Button onClick={clearInput}>X</Styled.Button>;
};
