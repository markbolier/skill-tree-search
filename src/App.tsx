import { useReducer, useState } from "react";
import Fuse from "fuse.js";

import { ClearInputButton } from "./components/clear-input-button";
import { Header } from "./components/header";
import { Item } from "./components/item";
import { SearchBar } from "./components/search-bar";
import * as Styled from "./App.styled";
import mockData from "../src/mock-data/example-data.json";

function App() {
  const initialState = {
    data: mockData,
    input: "",
    query: "",
    results: [],
  };

  const ACTIONS = {
    SET_INPUT: "SET_INPUT",
    SET_QUERY: "SET_QUERY",
    SET_RESULTS: "SET_RESULTS",
  };

  // TODO type parameters
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.SET_INPUT:
        return { ...state, input: action.payload };
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

  function clearInput() {
    dispatch({ type: ACTIONS.SET_INPUT, payload: "" });
    setPaginate(5);
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    let input = event.currentTarget.value;
    let formattedString = input.toLowerCase().trim().split(" ").join("|");
    let query = new RegExp(`\\b(${formattedString})\\b`, "gi");
    dispatch({ type: ACTIONS.SET_INPUT, payload: input });
    dispatch({ type: ACTIONS.SET_QUERY, payload: query });
    setPaginate(5);
  };

  const options = {
    includeMatches: true,
    keys: [
      { name: "title", weight: 2 },
      { name: "description", weight: 1 },
      { name: "label", weight: 0.5 },
    ],
  };
  const fuse = new Fuse(state.data, options);
  const results = fuse.search(state.input);

  console.log(results);

  function loadMore() {
    setPaginate(paginate + 5);
  }

  return (
    <div className="App">
      <Header />
      <Styled.InputContainer>
        <SearchBar query={state.input} handleInput={handleInput} />
        <ClearInputButton clearInput={clearInput} />
      </Styled.InputContainer>
      <Styled.List>
        {results
          .map((obj, i) => {
            return (
              <Item
                key={i}
                id={i}
                title={`FUZZY ${obj.item.title}`}
                description={obj.item.description}
                label={obj.item.label}
              />
            );
          })
          .slice(0, paginate)}
        {/* {state.results.length !== 0 &&
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
            .slice(0, paginate)} */}
        {state.query !== "" &&
          results.length !== 0 &&
          results.length !== paginate &&
          results.length > paginate && <Styled.Button onClick={loadMore}>Load more</Styled.Button>}
      </Styled.List>
    </div>
  );
}

export default App;
