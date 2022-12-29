import { Key, useReducer } from "react";

import { Header } from "./components/header";
import { Item } from "./components/item";
import { SearchBar } from "./components/search-bar";
import * as Styled from "./App.styled";
import mockData from "../src/mock-data/example-data.json";

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

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    let string = event.currentTarget.value;
    dispatch({ type: "SEARCH_INPUT", payload: string });

    const newArr = state.data
      .filter(
        (text: { title: string; label: string; description: string }) =>
          text.title.toLowerCase().includes(string.toLowerCase()) ||
          text.label.toLowerCase().includes(string.toLowerCase()) ||
          text.description.toLowerCase().includes(string.toLowerCase()),
      )
      .map((text: { title: string; label: string; description: string }) => {
        const replacement = (match: string) => `<mark style="color: #ea650d">${match}</mark>`;
        const regex = new RegExp(string, "gi");
        let markedTitle = text.title.replace(regex, replacement);
        let markedLabel = text.label.replace(regex, replacement);
        let markedDescription = text.description.replace(regex, replacement);
        return {
          ...text,
          title: markedTitle,
          label: markedLabel,
          description: markedDescription,
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
          ? state.queryData.map(
              (data: { id: string; title: string; label: string; description: string }) => (
                <Item
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  label={data.label}
                  description={data.description}
                />
              ),
            )
          : state.data.map(
              (data: { id: string; title: string; label: string; description: string }) => (
                <Item
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  label={data.label}
                  description={data.description}
                />
              ),
            )}
      </Styled.List>
    </div>
  );
}

export default App;
