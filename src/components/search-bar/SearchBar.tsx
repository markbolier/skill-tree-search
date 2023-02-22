import { useEffect, useRef, useState } from "react";

import { Data, SearchBarProps } from "../../types/types";
import { TypeaheadDropdown } from "../typeahead-dropdown";
import * as Styled from "./SearchBar.styled";

export const SearchBar = ({
  data,
  filter,
  handleInputEvent,
  handleRemove,
  isShown,
  query,
  setIsShown,
  updateInput,
}: SearchBarProps) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const searchBarRef = useRef<HTMLDivElement>(null);

  const regex = /\b[^\s]+\b/g;
  const titles = [...data.map((obj: Data) => obj.title.toLowerCase())];
  const allWords = titles.map((title) => title.match(regex) || []).flat();
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

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    updateInput(event.currentTarget.innerText);
    closeDropdown();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
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
  };

  useEffect(() => {
    openDropdown();
  }, [query !== ""]);

  return (
    <Styled.SearchBarContainer onBlur={handleBlur} ref={searchBarRef}>
      <Styled.Wrapper>
        {filter && (
          <Styled.Label
            onClick={handleRemove}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            #{filter}
            {isShown && <Styled.CloseIcon />}
          </Styled.Label>
        )}
        <Styled.Input
          value={query}
          onChange={handleInputEvent}
          placeholder="Search..."
          type="search"
        />
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
