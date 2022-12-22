import * as Styled from "./Item.styled";

export const Item = (props: any) => {
  return (
    <Styled.List key={props.id}>
      <Styled.Title dangerouslySetInnerHTML={{ __html: props.title }} />
      <Styled.Label dangerouslySetInnerHTML={{ __html: props.label }} />
      <Styled.Description dangerouslySetInnerHTML={{ __html: props.description }} />
    </Styled.List>
  );
};

export default Item;
