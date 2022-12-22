import { useReducer } from "react";

import * as Styled from "./SearchBar.styled";
import mockData from "../../mock-data/example-data.json";

export const SearchBar = () => {
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
      .filter(
        (text: any) =>
          // TODO put this in helper function?
          text.title.toLowerCase().includes(string.toLowerCase()) ||
          text.label.toLowerCase().includes(string.toLowerCase()) ||
          text.description.toLowerCase().includes(string.toLowerCase()),
      )
      .map((text: any) => {
        // TODO put this in helper function?
        const replacement = (match: any) => `<mark style="color: #ea650d">${match}</mark>`;
        let highlightedTitle = text.title.replace(new RegExp(string, "gi"), replacement);
        let highlightedLabel = text.label.replace(new RegExp(string, "gi"), replacement);
        let highlightedDescription = text.description.replace(
          new RegExp(string, "gi"),
          replacement,
        );
        return {
          ...text,
          title: highlightedTitle,
          label: highlightedLabel,
          description: highlightedDescription,
        };
      });

    dispatch({ type: "SEARCH_DATA", payload: newArr });
  };

  return (
    <div>
      <Styled.Input onChange={handleInput} placeholder="Search..." type="text"></Styled.Input>
      <Styled.List>
        {state.query.length > 0
          ? state.queryData.map((data: any) => (
              // TODO put this in seperate component
              // TODO create workaround for innerHTML or sanitize
              <Styled.ListItem key={data.id}>
                <Styled.Title dangerouslySetInnerHTML={{ __html: data.title }} />
                <Styled.Label dangerouslySetInnerHTML={{ __html: data.label }} />
                <Styled.Description dangerouslySetInnerHTML={{ __html: data.description }} />
              </Styled.ListItem>
            ))
          : state.data.map((data: any) => (
              // TODO put this in seperate component
              <Styled.ListItem key={data.id}>
                <Styled.Title>{data.title}</Styled.Title>
                <Styled.Label>{data.label}</Styled.Label>
                <Styled.Description>{data.description}</Styled.Description>
              </Styled.ListItem>
            ))}
      </Styled.List>
    </div>
  );
};

export default SearchBar;
