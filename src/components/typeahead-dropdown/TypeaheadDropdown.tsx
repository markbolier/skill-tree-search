import * as Styled from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  data: any;
  query: string;
}

export const TypeaheadDropdown = ({ data, query }: TypeaheadDropdownProps) => {
  const regex = /\b[^\s]+\b/g;
  const titles = [...data.map((obj: any) => obj.title.toLowerCase())];
  const allWords = [].concat(...titles.map((title) => title.match(regex) || []));
  const uniqueWords = [...new Set(allWords)];
  const autocompleteData = uniqueWords.filter((item: any) => item.includes(query.toLowerCase()));

  return (
    autocompleteData.length > 0 && (
      <Styled.AutocompleteDropdown>
        <Styled.AutocompleteList>
          {autocompleteData.slice(0, 10).map((item: any) => (
            <Styled.AutocompleteItem>{item}</Styled.AutocompleteItem>
          ))}
        </Styled.AutocompleteList>
      </Styled.AutocompleteDropdown>
    )
  );
};
