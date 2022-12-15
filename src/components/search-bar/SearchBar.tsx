import { ChangeEvent, useState } from "react";

import * as Styled from "./SearchBar.styled";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Search... " onChange={handleInputChange} value={query} />
    </div>
  );
};

export default SearchBar;
