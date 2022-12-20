import { useState } from "react";

import * as Styled from "./SearchBar.styled";
import mockData from "../../mock-data/example-data.json";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  const highlightQuery = (query: string, text: string) => {
    const regex = new RegExp(query, "gi");
    return text.replace(regex, `<mark style="background: yellow; color: white;">${query}</mark>`);
  };

  return (
    <div>
      <Styled.Input
        type="text"
        placeholder="Search... "
        onChange={(event) => setQuery(event.target.value)}
        value={query}
      ></Styled.Input>
      <Styled.List>
        {mockData
          .filter((data) => data.title.toLowerCase().includes(query))
          .map((data) => (
            <Styled.ListItem key={data.id}>
              <Styled.Title>{data.title}</Styled.Title>
              <Styled.Label>#{data.label}</Styled.Label>
              <Styled.Description>{data.description}</Styled.Description>
            </Styled.ListItem>
          ))}
      </Styled.List>
    </div>
  );
};

export default SearchBar;
