import DOMPurify from "dompurify";

import * as Styled from "./Item.styled";

interface ItemProps {
  description: string;
  id: string;
  label: string;
  title: string;
}

export const Item = ({ description, id, label, title }: ItemProps) => {
  return (
    <Styled.List id={id}>
      <Styled.Title dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }} />
      <Styled.Label dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(label) }} />
      <Styled.Description dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
    </Styled.List>
  );
};

export default Item;
