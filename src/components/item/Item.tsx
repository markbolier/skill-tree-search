import DOMPurify from "dompurify";
import { FuseHighlight } from "../fuse-highlight";

import * as Styled from "./Item.styled";

// TODO type these
interface ItemProps {
  description: any;
  hit: any;
  id: any;
  label: any;
  title: any;
}

export const Item = ({ description, hit, id, label, title }: ItemProps) => {
  return (
    <Styled.List id={id}>
      <Styled.Title>
        <FuseHighlight hit={hit} target="title">
          {title}
        </FuseHighlight>
      </Styled.Title>
      <Styled.Label>
        <FuseHighlight hit={hit} target="label">
          {label}
        </FuseHighlight>
      </Styled.Label>
      <Styled.Description>
        <FuseHighlight hit={hit} target="description">
          {description}
        </FuseHighlight>
      </Styled.Description>
    </Styled.List>
  );
};

export default Item;
