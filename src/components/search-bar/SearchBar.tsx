import { useState } from "react";

import * as Styled from "./SearchBar.styled";
import mockData from "../../mock-data/example-data.json";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  console.log(query);

  return (
    <div>
      <Styled.Input
        type="text"
        placeholder="Search... "
        onChange={(event) => setQuery(event.target.value)}
        value={query}
      />
      <Styled.List>
        {mockData
          .filter((data) => data.title.toLowerCase().includes(query))
          .map((data) => (
            <Styled.ListItem key={data.id}>
              <Styled.Title>{data.title}</Styled.Title>
              <Styled.Label>{data.label}</Styled.Label>
              <Styled.Description>{data.description}</Styled.Description>
            </Styled.ListItem>
          ))}
      </Styled.List>
    </div>
  );
};

export default SearchBar;
