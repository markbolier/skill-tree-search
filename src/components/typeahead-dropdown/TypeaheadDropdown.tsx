import { useState } from "react";

import * as Styled from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  data: any;
  query: string;
  updateInput: any;
}

export const TypeaheadDropdown = ({ data, query, updateInput }: TypeaheadDropdownProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const regex = /\b[^\s]+\b/g;
  const titles = [...data.map((obj: any) => obj.title.toLowerCase())];
  const allWords = [].concat(...titles.map((title) => title.match(regex) || []));
  const uniqueWords = [...new Set(allWords)];
  const autocompleteData = uniqueWords.filter((item: any) => item.includes(query.toLowerCase()));

  const handleClick = (event: any) => {
    console.log(event.currentTarget.innerText);
    setIsOpen(!isOpen);
    updateInput(event.currentTarget.innerText);
  };

  return (
    <>
      {autocompleteData.length > 0 && query.length > 1 && isOpen && (
        <Styled.AutocompleteDropdown>
          <Styled.AutocompleteList>
            {autocompleteData.slice(0, 10).map((item: any, i: number) => (
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
