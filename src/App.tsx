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
    results: [],
  };

  const ACTIONS = {
    SET_QUERY: "SET_QUERY",
    SET_RESULTS: "SET_RESULTS",
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.SET_QUERY:
        return { ...state, query: action.payload };
      case ACTIONS.SET_RESULTS:
        return { ...state, results: action.payload };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [paginate, setPaginate] = useState(5);

  const clearInput = () => {
    dispatch({ type: ACTIONS.SET_QUERY, payload: "" });
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    let input = event.currentTarget.value;
    let formattedString = input.toLowerCase().trim().split(" ").join("|");
    let query = new RegExp(`\\b(${formattedString})\\b`, "gi");
    dispatch({ type: ACTIONS.SET_QUERY, payload: formattedString });
    showResults(query);
  };

  //TODO hide load more button when there are no (more) results👇
  const loadMore = () => {
    setPaginate(paginate + 5);
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

  return (
    <div className="App">
      <Header />
      <Styled.InputContainer>
        <SearchBar query={state.query} handleInput={handleInput} />
        <ClearInputButton clearInput={clearInput} />
      </Styled.InputContainer>
      <Styled.List>
        {state.query.length > 0 &&
          state.results
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
