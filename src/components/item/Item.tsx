import * as Styled from "./Item.styled";

interface ItemProps {
  description: string;
  query: string;
  id: any;
  label: string;
  title: string;
}

const highlightQuery = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part: any, i: number) => (
        <span
          key={i}
          style={part.toLowerCase() === query.toLowerCase() ? { backgroundColor: "yellow" } : {}}
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
};

export const Item = ({ description, query, id, label, title }: ItemProps) => {
  return (
    <Styled.List id={id}>
      <Styled.Title>{highlightQuery(title, query)}</Styled.Title>
      <Styled.Label>{highlightQuery(label, query)}</Styled.Label>
      <Styled.Description>{highlightQuery(description, query)}</Styled.Description>
    </Styled.List>
  );
};
