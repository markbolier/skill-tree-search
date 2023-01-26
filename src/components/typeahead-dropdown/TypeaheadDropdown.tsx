import {
  AutocompleteItem,
  AutocompleteList,
  AutocompleteDropdown,
} from "./TypeaheadDropdown.styled";

export const TypeaheadDropdown = () => {
  return (
    <AutocompleteDropdown>
      <AutocompleteList>
        <AutocompleteItem>Autocomplete item</AutocompleteItem>
        <AutocompleteItem>Autocomplete item</AutocompleteItem>
      </AutocompleteList>
    </AutocompleteDropdown>
  );
};
