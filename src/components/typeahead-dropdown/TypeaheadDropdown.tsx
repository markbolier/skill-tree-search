import { useRef, useState } from "react";

import * as Styled from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  // TODO type data en updateInput
  data: any;
  query: string;
  updateInput: (event: any) => void;
}

export const TypeaheadDropdown = ({ data, query, updateInput }: TypeaheadDropdownProps) => {
  const [focusIndex, setFocusIndex] = useState(-1);
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

  const handleKeyDown = (event: any) => {
    console.log(autocompleteData.length);
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        if (focusIndex > -1) {
          setFocusIndex(focusIndex - 1);
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (focusIndex < autocompleteData.length - 1 && focusIndex < 9) {
          setFocusIndex(focusIndex + 1);
        }
        break;
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
    <>
      {autocompleteData.length > 0 && query.length > 1 && isOpen && (
        <Styled.AutocompleteDropdown tabIndex={-1}>
          <Styled.AutocompleteList tabIndex={-1}>
            {autocompleteData.slice(0, 10).map((item: string, i: number) => (
              <Styled.AutocompleteItem
                focusIndex={focusIndex}
                key={i}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                suggestionIndex={i}
                tabIndex={0}
                ref={autoCompleteRef}
              >
                {item}
              </Styled.AutocompleteItem>
            ))}
          </Styled.AutocompleteList>
        </Styled.AutocompleteDropdown>
      )}
    </>
  );
};
