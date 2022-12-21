import { useReducer, useState } from "react";

import * as Styled from "./SearchBar.styled";
import mockData from "../../mock-data/example-data.json";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  const initialState = {
    data: mockData,
    query: "",
    queryData: [],
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "SET_DATA":
        return { ...state, data: action.payload };
      case "SEARCH_INPUT":
        return { ...state, query: action.payload };
      case "SEARCH_DATA":
        return { ...state, queryData: action.payload };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInput = (event: any) => {
    let string = event.target.value;
    dispatch({ type: "SEARCH_INPUT", payload: string });
    const newArr = state.data
      .filter((text: any) => text.title.toLowerCase().includes(string.toLowerCase()))
      .map((text: any) => {
        let highlightedTitle = text.title.replace(
          new RegExp(string, "gi"),
          (match: any) => `<mark>${match}</mark>`,
        );
        return {
          ...text,
          title: highlightedTitle,
        };
      });
    dispatch({ type: "SEARCH_DATA", payload: newArr });
  };

  return (
    <div>
      <Styled.Input
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleInput}
        placeholder="Search..."
        type="text"
        value={query}
      ></Styled.Input>
      <Styled.List>
        {state.queryData.map((data: any) => (
          <Styled.ListItem key={data.id}>
            <Styled.Title dangerouslySetInnerHTML={{ __html: data.title }}></Styled.Title>
            <Styled.Label>#{data.label}</Styled.Label>
            <Styled.Description>{data.description}</Styled.Description>
          </Styled.ListItem>
        ))}
      </Styled.List>
    </div>
  );
};

export default SearchBar;
