import { useReducer, useState } from "react";

import { ClearInputButton } from "./components/clear-input-button";
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

  const [paginate, setPaginate] = useState(5);

  const ACTIONS = {
    SET_DATA: "SET_DATA",
    SET_QUERY: "SET_QUERY",
    SET_RESULTS: "SET_RESULTS",
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.SET_DATA:
        return { ...state, data: action.payload };
      case ACTIONS.SET_QUERY:
        return { ...state, query: action.payload };
      case ACTIONS.SET_RESULTS:
        return { ...state, queryData: action.payload };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    let input = event.currentTarget.value.toLowerCase();
    let string = input.trim().split(" ").join("|");
    let query = new RegExp(`\\b(${string})\\b`, "gi");

    dispatch({ type: ACTIONS.SET_QUERY, payload: string });

    showResults(query);
  };

  const showResults = (query: RegExp) => {
    const filteredData = state.data
      .filter(
        (text: { title: string; label: string; description: string }) =>
          text.title.match(query) || text.label.match(query) || text.description.match(query),
      )
      .map((text: { title: string; label: string; description: string }) => {
        const replacement = (match: string) => `<mark style="color: #ea650d">${match}</mark>`;
        let markedTitle = text.title.replace(query, replacement);
        let markedLabel = text.label.replace(query, replacement);
        let markedDescription = text.description.replace(query, replacement);
        return {
          ...text,
          title: markedTitle,
          label: markedLabel,
          description: markedDescription,
        };
      });

    dispatch({ type: ACTIONS.SET_RESULTS, payload: filteredData });
  };

  const loadMore = () => {
    setPaginate(paginate + 5);
  };

  return (
    <div className="App">
      <Header />
      <Styled.InputContainer>
        <SearchBar handleInput={handleInput} />
        <ClearInputButton />
      </Styled.InputContainer>
      <Styled.List>
        {state.query.length > 0 &&
          state.queryData
            .map((data: { id: string; title: string; label: string; description: string }) => (
              <Item
                key={data.id}
                id={data.id}
                title={data.title}
                label={data.label}
                description={data.description}
              />
            ))
            .slice(0, paginate)}
        <Styled.Button onClick={loadMore}>Load more</Styled.Button>
      </Styled.List>
    </div>
  );
}

export default App;
