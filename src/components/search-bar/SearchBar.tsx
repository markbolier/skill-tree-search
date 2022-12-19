import { ChangeEvent, useState } from "react";

import * as Styled from "./SearchBar.styled";
import mockData from "../../mock-data/example-data.json";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  console.log(query);

  return (
    <div>
      <input
        type="text"
        placeholder="Search... "
        onChange={(event) => setQuery(event.target.value)}
        value={query}
      />
      <ul>
        {mockData
          .filter((data) => data.title.toLowerCase().includes(query))
          .map((data) => (
            <li key={data.id}>{data.title}</li>
          ))}
      </ul>
    </div>
  );
};

export default SearchBar;
