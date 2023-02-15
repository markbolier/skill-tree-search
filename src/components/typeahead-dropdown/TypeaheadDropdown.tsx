import * as Styled from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  autoCompleteData: any;
  focusIndex: number;
  handleClick: any;
  handleKeyDown: any;
  isOpen: any;
  query: string;
}

export const TypeaheadDropdown = ({
  autoCompleteData,
  focusIndex,
  handleClick,
  handleKeyDown,
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
              key={i}
              onClick={handleClick}
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
