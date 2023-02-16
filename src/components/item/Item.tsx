import * as Styled from "./Item.styled";

interface ItemProps {
  description: string;
  id: string;
  label: string;
  query: string;
  title: string;
  handleFilter: any;
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

export const Item = ({ handleFilter, description, id, label, query, title }: ItemProps) => {
  return (
    <Styled.List id={id}>
      <Styled.Title>{highlightQuery(title, query)}</Styled.Title>
      <Styled.Label onClick={handleFilter}>{highlightQuery(`#${label}`, query)}</Styled.Label>
      <Styled.Description>{highlightQuery(description, query)}</Styled.Description>
    </Styled.List>
  );
};
