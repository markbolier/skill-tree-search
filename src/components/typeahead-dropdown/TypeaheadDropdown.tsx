import { TypeaheadDropdownProps } from "../../types/types";
import * as Styled from "./TypeaheadDropdown.styled";

export const TypeaheadDropdown = ({
  autoCompleteData,
  focusIndex,
  handleClick,
  handleFocus,
  handleKeyDown,
  isOpen,
  query,
}: TypeaheadDropdownProps) => {
  return (
    <Styled.AutocompleteDropdown>
      <Styled.AutocompleteList>
        {query.length > 1 &&
          isOpen &&
          autoCompleteData.slice(0, 10).map((item: string, i: number) => (
            <Styled.AutocompleteItem
              focusIndex={focusIndex}
              key={i}
              onClick={handleClick}
              onFocus={() => handleFocus(i)}
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
