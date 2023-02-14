import { useRef, useState } from "react";

import { TypeaheadDropdown } from "../typeahead-dropdown";
import * as Styled from "./SearchBar.styled";

interface SearchBarProps {
  data: any;
  handleInput: (event: React.FormEvent<HTMLInputElement>) => void;
  query: string;
  updateInput: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ data, handleInput, query, updateInput }: SearchBarProps) => {
  const [focusIndex, setFocusIndex] = useState(-1);
  // Maybe it's because isOpen doesnt update that Typeahead doesnt open the second time?
  const [isOpen, setIsOpen] = useState(true);
  const autoCompleteRef = useRef(null);

  const regex = /\b[^\s]+\b/g;
  const titles = [...data.map((obj: any) => obj.title.toLowerCase())];
  const allWords = [].concat(...titles.map((title) => title.match(regex) || []));
  const uniqueWords = [...new Set(allWords)];
  const autocompleteData = uniqueWords.filter((item: string) => item.includes(query.toLowerCase()));

  const handleClick = (event: any) => {
    setIsOpen(!isOpen);
    updateInput(event.currentTarget.innerText);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        if (focusIndex > -1) {
          setFocusIndex(focusIndex - 1);
        }
        break;
      case "ArrowDown":
      case "Tab":
        event.preventDefault();
        if (focusIndex < autocompleteData.length - 1 && focusIndex < 9) {
          setFocusIndex(focusIndex + 1);
        }
        break;
      case "Enter":
        event.preventDefault();
        const suggestion = autocompleteData[focusIndex];
        updateInput(suggestion);
        setFocusIndex(0);
        setIsOpen(false);
        break;
    }
  };

  return (
    <Styled.SearchBarContainer>
      <Styled.Input value={query} onChange={handleInput} placeholder="Search..." type="search" />
      {query !== "" && (
        <TypeaheadDropdown
          autoCompleteData={autocompleteData}
          autoCompleteRef={autoCompleteRef}
          focusIndex={focusIndex}
          handleClick={handleClick}
          handleKeyDown={handleKeyDown}
          isOpen={isOpen}
          query={query}
        />
      )}
    </Styled.SearchBarContainer>
  );
};
