import { useReducer, useState, useEffect } from "react";
import Fuse from "fuse.js";

import { Header } from "./components/header";
import { Item } from "./components/item";
import { SearchBar } from "./components/search-bar";
import * as Styled from "./App.styled";
import mockData from "../src/mock-data/example-data.json";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const initialState = {
    data: mockData,
    input: "",
    results: [],
  };

  const ACTIONS = {
    SET_INPUT: "SET_INPUT",
    SET_RESULTS: "SET_RESULTS",
  };

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

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    dispatch({ type: ACTIONS.SET_INPUT, payload: input });
    setPaginate(5);
  };

  const loadMore = () => {
    setPaginate(paginate + 5);
  };

  const showResults = () => {
    const results = fuse.search(state.input);
    dispatch({ type: ACTIONS.SET_RESULTS, payload: results });
  };

  //TODO type updateInput
  const updateInput = (event: any) => {
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
        handleInput={handleInput}
        updateInput={updateInput}
        query={state.input}
      />
      <Styled.List>
        {state.results
          .map((hit: any) => {
            return (
              <Item
                description={hit.item.description}
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
