import * as Styled from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  data: any;
  query: string;
}

export const TypeaheadDropdown = ({ data, query }: TypeaheadDropdownProps) => {
  const regex = /\b[^\s]+\b/g;
  const titles = [...data.map((obj: any) => obj.title.toLowerCase())];
  const allWords = [...titles.map((title) => title.match(regex))];
  console.log(allWords);

  const autocompleteData = data.filter((item: any) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Styled.AutocompleteDropdown>
      <Styled.AutocompleteList>
        {autocompleteData.map((item: any) => (
          <Styled.AutocompleteItem>{item.title}</Styled.AutocompleteItem>
        ))}
      </Styled.AutocompleteList>
    </Styled.AutocompleteDropdown>
  );
};
