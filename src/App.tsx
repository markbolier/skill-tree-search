import { useReducer, useState, useEffect } from "react";
import Fuse from "fuse.js";

import { ClearInputButton } from "./components/clear-input-button";
import { Header } from "./components/header";
import { Item } from "./components/item";
import { SearchBar } from "./components/search-bar";
import * as Styled from "./App.styled";
import mockData from "../src/mock-data/example-data.json";
import useDebounce from "./hooks/useDebounce";
import { FuseHighlight } from "./components/fuse-highlight/FuseHighlight";

const App = () => {
  const ACTIONS = {
    SET_INPUT: "SET_INPUT",
    SET_RESULTS: "SET_RESULTS",
  };

  const initialState = {
    data: mockData,
    input: "",
    query: "",
    results: [],
  };

  // TODO type parameters
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.SET_INPUT:
        return { ...state, input: action.payload };
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

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    const input = event.currentTarget.value;
    dispatch({ type: ACTIONS.SET_INPUT, payload: input });
    setPaginate(5);
  }

  // function highlightMatches() {
  //   const items = state.results;
  //   items.filter((item: any) => {
  //     console.log(item.matches);
  //   });
  // }

  // highlightMatches();

  function loadMore() {
    setPaginate(paginate + 5);
  }

  function showResults() {
    const results = fuse.search(state.input);
    dispatch({ type: ACTIONS.SET_RESULTS, payload: results });
  }

  const options = {
    includeMatches: true,
    keys: [
      { name: "title", weight: 3 },
      { name: "description", weight: 2 },
      { name: "label", weight: 1 },
    ],
  };
  const fuse = new Fuse(state.data, options);
  const searchQuery = useDebounce(state.input, 1000);

  useEffect(() => {
    showResults();
  }, [searchQuery]);

  return (
    <div className="App">
      <Header />
      <Styled.InputContainer>
        <SearchBar query={state.input} handleInput={handleInput} />
        <ClearInputButton clearInput={clearInput} />
      </Styled.InputContainer>
      <Styled.List>
        {state.results
          .map((hit: any, i: number) => {
            return (
              <>
                <Item
                  description={hit.item.description}
                  hit={hit}
                  id={i}
                  key={i}
                  label={hit.item.label}
                  title={hit.item.title}
                ></Item>
              </>
            );
          })
          .slice(0, paginate)}
        {state.results.length !== paginate && state.results.length > paginate && (
          <Styled.Button onClick={loadMore}>Load more</Styled.Button>
        )}
      </Styled.List>
    </div>
  );
};

export default App;
