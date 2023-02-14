import * as Styled from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  autoCompleteData: any;
  autoCompleteRef: any;
  focusIndex: number;
  handleClick: any;
  handleKeyDown: any;
  isOpen: any;
  query: string;
}

export const TypeaheadDropdown = ({
  autoCompleteData,
  autoCompleteRef,
  focusIndex,
  handleClick,
  handleKeyDown,
  isOpen,
  query,
}: TypeaheadDropdownProps) => {
  return (
    <>
      {autoCompleteData.length > 0 && query.length > 1 && isOpen && (
        <Styled.AutocompleteDropdown tabIndex={-1}>
          <Styled.AutocompleteList tabIndex={-1}>
            {autoCompleteData.slice(0, 10).map((item: string, i: number) => (
              <Styled.AutocompleteItem
                focusIndex={focusIndex}
                key={i}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                ref={autoCompleteRef}
                suggestionIndex={i}
                tabIndex={0}
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
