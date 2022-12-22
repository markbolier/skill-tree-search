import * as Styled from "./App.styled";
import { useReducer } from "react";

import { Header } from "./components/header";
import { SearchBar } from "./components/search-bar";
import mockData from "../src/mock-data/example-data.json";
import { Item } from "./components/item";

function App() {
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
    <div className="App">
      <Header />
      <SearchBar handleInput={handleInput} />
      <Styled.List>
        {state.query.length > 0
          ? state.queryData.map((data: any) => (
              <Item
                key={data.id}
                title={data.title}
                label={data.label}
                description={data.description}
              />
            ))
          : state.data.map((data: any) => (
              <Item
                key={data.id}
                title={data.title}
                label={data.label}
                description={data.description}
              />
            ))}
      </Styled.List>
    </div>
  );
}

export default App;
