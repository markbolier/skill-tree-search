import * as Styled from "./Item.styled";

interface ItemProps {
  description: string;
  id: string;
  label: string;
  title: string;
}

// TODO create workaround for innerHTML or sanitize
export const Item = ({ description, id, label, title }: ItemProps) => {
  return (
    <Styled.List id={id}>
      <Styled.Title dangerouslySetInnerHTML={{ __html: title }} />
      <Styled.Label dangerouslySetInnerHTML={{ __html: label }} />
      <Styled.Description dangerouslySetInnerHTML={{ __html: description }} />
    </Styled.List>
  );
};

export default Item;
