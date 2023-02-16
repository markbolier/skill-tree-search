import * as Styled from "./Item.styled";

interface ItemProps {
  description: string;
  id: string;
  label: string;
  query: string;
  title: string;
}

const highlightQuery = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part: string, i: number) => (
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

export const Item = ({ description, id, label, query, title }: ItemProps) => {
  return (
    <Styled.List id={id}>
      <Styled.Title>{highlightQuery(title, query)}</Styled.Title>
      <Styled.Label>{highlightQuery(`#${label}`, query)}</Styled.Label>
      <Styled.Description>{highlightQuery(description, query)}</Styled.Description>
    </Styled.List>
  );
};
