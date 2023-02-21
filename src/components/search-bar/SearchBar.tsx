import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import { TypeaheadDropdown } from "../typeahead-dropdown";
import * as Styled from "./SearchBar.styled";

interface SearchBarProps {
  data: any;
  filter: string;
  handleInput: (event: FormEvent<HTMLInputElement>) => void;
  handleRemove: () => void;
  query: string;
  updateInput: (event: FormEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
  data,
  filter,
  handleInput,
  handleRemove,
  query,
  updateInput,
}: SearchBarProps) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const searchBarRef = useRef<HTMLDivElement>(null);

  const regex = /\b[^\s]+\b/g;
  const titles = [...data.map((obj: any) => obj.title.toLowerCase())];
  const allWords = [].concat(...titles.map((title) => title.match(regex) || []));
  const uniqueWords = [...new Set(allWords)];
  const autocompleteData = uniqueWords.filter((item: string) => item.includes(query.toLowerCase()));

  const closeDropdown = () => {
    setFocusIndex(0);
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.relatedTarget)) {
      closeDropdown();
    }
  };

  const handleClick = (event: any) => {
    updateInput(event.target.innerText);
    closeDropdown();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case "ArrowUp":
        if (focusIndex > 0) {
          setFocusIndex(focusIndex - 1);
        }
        break;
      case "ArrowDown":
      case "Tab":
        if (focusIndex < autocompleteData.length - 1 && focusIndex < 9) {
          setFocusIndex(focusIndex + 1);
        }
        break;
      case "Enter":
        const suggestion = autocompleteData[focusIndex];
        updateInput(suggestion);
        closeDropdown();
        break;
    }
  };

  const openDropdown = () => {
    setFocusIndex(0);
    setIsOpen(true);
    setIsFocused(true);
  };

  useEffect(() => {
    openDropdown();
  }, [query !== ""]);

  return (
    <Styled.SearchBarContainer ref={searchBarRef} onBlur={handleBlur}>
      <Styled.Wrapper>
        {filter && <Styled.Label onClick={handleRemove}>{filter}</Styled.Label>}
        <Styled.Input value={query} onChange={handleInput} placeholder="Search..." type="search" />
      </Styled.Wrapper>
      <TypeaheadDropdown
        autoCompleteData={autocompleteData}
        focusIndex={focusIndex}
        handleClick={handleClick}
        handleFocus={handleFocus}
        handleKeyDown={handleKeyDown}
        isFocused={isFocused}
        isOpen={isOpen}
        query={query}
      />
    </Styled.SearchBarContainer>
  );
};
