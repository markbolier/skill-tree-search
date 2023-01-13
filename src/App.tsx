import { useEffect, useReducer, useState } from "react";
import Fuse from "fuse.js";

import { ClearInputButton } from "./components/clear-input-button";
import { Header } from "./components/header";
import { Item } from "./components/item";
import { SearchBar } from "./components/search-bar";
import * as Styled from "./App.styled";
import mockData from "../src/mock-data/example-data.json";
import useDebounce from "./hooks/useDebounce";

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

  // TODO type parameters for this
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

  const fuse = new Fuse(state.data, { keys: ["title", "description", "label"] });

  const result = fuse.search(state.input);

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
        {result.map((item, i) => {
          return (
            <Item
              key={i}
              id={i}
              title={`FUZZY ${item.item.title}`}
              description={item.item.description}
              label={item.item.label}
            />
          );
        })}
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
            .slice(0, paginate)}
        {state.query !== "" &&
          state.results.length !== 0 &&
          state.results.length !== paginate &&
          state.results.length > paginate && (
            <Styled.Button onClick={loadMore}>Load more</Styled.Button>
          )} */}
      </Styled.List>
    </div>
  );
}

export default App;
