import { useState } from "react";

import * as Styled from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  // TODO type data en updateInput
  data: any;
  query: string;
  updateInput: (event: any) => void;
}

export const TypeaheadDropdown = ({ data, query, updateInput }: TypeaheadDropdownProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const regex = /\b[^\s]+\b/g;
  const titles = [...data.map((obj: any) => obj.title.toLowerCase())];
  const allWords = [].concat(...titles.map((title) => title.match(regex) || []));
  const uniqueWords = [...new Set(allWords)];
  const autocompleteData = uniqueWords.filter((item: string) => item.includes(query.toLowerCase()));

  const handleClick = (event: any) => {
    setIsOpen(!isOpen);
    updateInput(event.currentTarget.innerText);
  };

  return (
    <>
      {autocompleteData.length > 0 && query.length > 1 && isOpen && (
        <Styled.AutocompleteDropdown>
          <Styled.AutocompleteList>
            {autocompleteData.slice(0, 10).map((item: string, i: number) => (
              <Styled.AutocompleteItem onClick={(event) => handleClick(event)} key={i}>
                {item}
              </Styled.AutocompleteItem>
            ))}
          </Styled.AutocompleteList>
        </Styled.AutocompleteDropdown>
      )}
    </>
  );
};
