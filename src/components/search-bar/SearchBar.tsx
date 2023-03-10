import { useEffect, useRef, useState } from "react";

import { DataProps, SearchBarProps } from "../../types/types";
import { TypeaheadDropdown } from "../typeahead-dropdown";
import * as Styled from "./SearchBar.styled";

export const SearchBar = ({
  data,
  filter,
  handleInput,
  handleRemove,
  query,
  updateInput,
}: SearchBarProps) => {
  const [focusIndex, setFocusIndex] = useState(-1);
  const [, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isUserInput, setIsUserInput] = useState(false);

  const searchBarRef = useRef<HTMLDivElement>(null);

  const regex = /\b[^\s]+\b/g;
  const titles = [...data.map((obj: DataProps) => obj.title.toLowerCase())];
  const allWords = titles.map((title) => title.match(regex) || []).flat();
  const uniqueWords = [...new Set(allWords)];
  const autocompleteData = uniqueWords.filter((item: string) => item.includes(query.toLowerCase()));

  const closeDropdown = () => {
    setFocusIndex(-1);
    setIsOpen(false);
    setIsFocused(false);
  };

  const openDropdown = () => {
    setIsOpen(true);
    setIsFocused(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.relatedTarget)) {
      closeDropdown();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setIsUserInput(true);
    updateInput(event.currentTarget.innerText);
    closeDropdown();
  };

  const handleFocus = (index: number) => {
    openDropdown();
    setFocusIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    switch (event.key) {
      case "ArrowUp":
        if (focusIndex > -1) {
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
        setIsUserInput(true);
        const suggestion = autocompleteData[focusIndex];
        updateInput(suggestion);
        closeDropdown();
        break;
    }
  };

  useEffect(() => {
    if (isUserInput) {
      closeDropdown();
      setIsUserInput(false);
      return;
    }
    openDropdown();
  }, [query || updateInput]);

  return (
    <Styled.Container>
      <Styled.SearchBar onBlur={handleBlur} ref={searchBarRef}>
        <Styled.Wrapper>
          <Styled.SearchIcon>????</Styled.SearchIcon>
          {filter.length > 0 && (
            <Styled.Label onClick={handleRemove}>
              #{filter}
              <Styled.CloseIcon />
            </Styled.Label>
          )}
          <Styled.Input
            onChange={handleInput}
            placeholder="Search..."
            type="search"
            value={query}
          />
        </Styled.Wrapper>
        <TypeaheadDropdown
          autoCompleteData={autocompleteData}
          focusIndex={focusIndex}
          handleClick={handleClick}
          handleFocus={handleFocus}
          handleKeyDown={handleKeyDown}
          isOpen={isOpen}
          query={query}
        />
      </Styled.SearchBar>
    </Styled.Container>
  );
};
