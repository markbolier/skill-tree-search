import * as Styled from "./Label.styled";

interface LabelProps {
  label: any;
}

export const Label = ({ label }: LabelProps) => {
  return <Styled.Label>#{label}</Styled.Label>;
};
