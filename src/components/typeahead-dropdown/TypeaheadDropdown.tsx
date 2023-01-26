import {
  AutocompleteItem,
  AutocompleteList,
  AutocompleteDropdown,
} from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  allTitles: any;
  query: string;
}

export const TypeaheadDropdown = ({ allTitles, query }: TypeaheadDropdownProps) => {
  const filteredTitles = allTitles.filter((item: any) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <AutocompleteDropdown>
      <AutocompleteList>
        {filteredTitles.map((item: any) => (
          <AutocompleteItem>{item.title}</AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompleteDropdown>
  );
};
