import * as Styled from "./Item.styled";

interface ItemProps {
  description: string;
  handleFilter: (event: any) => void;
  id: string;
  label: string;
  query: string;
  title: string;
}

const highlightQuery = (text: string, query: string) => {
  const queryTerms = query
    .trim()
    .split(" ")
    .filter((term) => term.length > 1);
  const regex = new RegExp(`(${queryTerms.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {" "}
      {parts.map((part: string, i: number) => {
        const queryTerm = queryTerms.find((term) => part.toLowerCase() === term.toLowerCase());
        return (
          <span key={i} style={queryTerm ? { backgroundColor: "yellow" } : {}}>
            {part}
          </span>
        );
      })}{" "}
    </span>
  );
};

export const Item = ({ description, handleFilter, id, label, query, title }: ItemProps) => {
  return (
    <Styled.List id={id}>
      <Styled.Title>{highlightQuery(title, query)}</Styled.Title>
      <Styled.Label onClick={handleFilter}>{highlightQuery(`#${label}`, query)}</Styled.Label>
      <Styled.Description>{highlightQuery(description, query)}</Styled.Description>
    </Styled.List>
  );
};
