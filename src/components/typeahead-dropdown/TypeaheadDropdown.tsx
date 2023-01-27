import * as Styled from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  allTitles: any;
  query: string;
}

export const TypeaheadDropdown = ({ allTitles, query }: TypeaheadDropdownProps) => {
  const filteredTitles = allTitles.filter((item: any) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Styled.AutocompleteDropdown>
      <Styled.AutocompleteList>
        {filteredTitles.map((item: any) => (
          <Styled.AutocompleteItem>{item.title}</Styled.AutocompleteItem>
        ))}
      </Styled.AutocompleteList>
    </Styled.AutocompleteDropdown>
  );
};
