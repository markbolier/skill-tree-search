import { ChangeEvent, useState } from "react";

import * as Styled from "./SearchBar.styled";

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
    </div>
  );
};

export default SearchBar;
