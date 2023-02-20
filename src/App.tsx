import { useReducer, useState, useEffect } from "react";
import Fuse from "fuse.js";

import { Header } from "./components/header";
import { Item } from "./components/item";
import { SearchBar } from "./components/search-bar";
import * as Styled from "./App.styled";
import mockData from "../src/mock-data/example-data.json";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const ACTIONS = {
    SET_FILTER: "SET_FILTER",
    SET_INPUT: "SET_INPUT",
    SET_RESULTS: "SET_RESULTS",
  };

  const initialState = {
    data: mockData,
    filter: "",
    input: "",
    results: [],
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.SET_FILTER:
        return { ...state, filter: action.payload };
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

  const handleFilter = (event: any) => {
    const filter = event.currentTarget.innerText;
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    dispatch({ type: ACTIONS.SET_INPUT, payload: input });
    setPaginate(5);
  };

  const loadMore = () => {
    setPaginate(paginate + 5);
  };

  const handleRemove = () => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: "" });
  };

  const showResults = () => {
    const searchTerms = state.input.trim().split(" ");
    const results = searchTerms.map((term: string) => {
      return fuse.search(term);
    });
    // const results = fuse.search(state.input);
    dispatch({ type: ACTIONS.SET_RESULTS, payload: results.flat() });
  };

  const updateInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event;
    dispatch({ type: ACTIONS.SET_INPUT, payload: input });
    setPaginate(5);
  };

  const options = {
    distance: 10000,
    includeMatches: true,
    isCaseSensitive: false,
    keys: [
      { name: "title", weight: 3 },
      { name: "description", weight: 2 },
      { name: "label", weight: 1 },
    ],
    location: 0,
    minMatchCharLength: 2,
    threshold: 0.4,
  };

  const fuse = new Fuse(state.data, options);

  const searchQuery = useDebounce(state.input, 700);

  useEffect(() => {
    showResults();
  }, [searchQuery]);

  return (
    <Styled.Container>
      <Header />
      <SearchBar
        data={state.data}
        filter={state.filter}
        handleInput={handleInput}
        handleRemove={handleRemove}
        query={state.input}
        updateInput={updateInput}
      />
      <Styled.List>
        {state.results
          .map((hit: any) => {
            return (
              <Item
                description={hit.item.description}
                handleFilter={handleFilter}
                id={hit.refIndex}
                key={hit.refIndex}
                label={hit.item.label}
                query={state.input}
                title={hit.item.title}
              />
            );
          })
          .slice(0, paginate)}
        {state.results.length !== paginate && state.results.length > paginate && (
          <Styled.Button onClick={loadMore}>Load more</Styled.Button>
        )}
      </Styled.List>
    </Styled.Container>
  );
};

export default App;
