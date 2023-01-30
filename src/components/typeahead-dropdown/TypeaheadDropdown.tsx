import * as Styled from "./TypeaheadDropdown.styled";

interface TypeaheadDropdownProps {
  data: any;
  query: string;
}

export const TypeaheadDropdown = ({ data, query }: TypeaheadDropdownProps) => {
  // const regex = new RegExp("\b[^s]+\b", "gi");
  // // const filteredTitles = allTitles.filter((item: any) =>
  // //   item.title.toLowerCase().includes(query.toLowerCase()),
  // // );

  // const titleSet = new Set(allTitles.replace(\b[^s]+\, ''));
  // console.log(titleSet);

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
