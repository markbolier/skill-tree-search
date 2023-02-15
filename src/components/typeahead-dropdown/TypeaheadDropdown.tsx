import { KeyboardEvent } from "react";

import * as Styled from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  autoCompleteData: any;
  focusIndex: number;
  handleClick: (event: any) => void;
  handleFocus: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  isFocused: boolean;
  isOpen: boolean;
  query: string;
}

export const TypeaheadDropdown = ({
  autoCompleteData,
  focusIndex,
  handleClick,
  handleFocus,
  handleKeyDown,
  isFocused,
  isOpen,
  query,
}: TypeaheadDropdownProps) => {
  return (
    <Styled.AutocompleteDropdown tabIndex={-1}>
      <Styled.AutocompleteList tabIndex={-1}>
        {query.length > 1 &&
          isOpen &&
          autoCompleteData.slice(0, 10).map((item: string, i: number) => (
            <Styled.AutocompleteItem
              focusIndex={focusIndex}
              isFocused={isFocused}
              key={i}
              onClick={handleClick}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              suggestionIndex={i}
              tabIndex={0}
            >
              {item}
            </Styled.AutocompleteItem>
          ))}
      </Styled.AutocompleteList>
    </Styled.AutocompleteDropdown>
  );
};
