import { useReducer, useState, useEffect } from "react";
import Fuse from "fuse.js";

import { Header } from "./components/header";
import { Item } from "./components/item";
import { SearchBar } from "./components/search-bar";
import * as Styled from "./App.styled";
import mockData from "../src/mock-data/example-data.json";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  enum ACTIONS {
    SET_FILTER = "SET_FILTER",
    SET_INPUT = "SET_INPUT",
    SET_RESULTS = "SET_RESULTS",
  }

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

  const [isShown, setIsShown] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [paginate, setPaginate] = useState(5);

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const filter = event.currentTarget.innerText.substring(1);
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const handleInputEvent = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    dispatch({ type: ACTIONS.SET_INPUT, payload: value });
    setPaginate(5);
  };

  const loadMore = () => {
    setPaginate(paginate + 5);
  };

  const handleRemove = () => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: "" });
    setIsShown(false);
  };

  const showResults = () => {
    const searchTerms = state.input.trim().split(" ");
    const results = searchTerms
      .flatMap((term: string) => fuse.search(term))
      .filter((result: any) => !state.filter || result.item.label === state.filter);
    dispatch({ type: ACTIONS.SET_RESULTS, payload: results });
  };

  const updateInput = (value: string) => {
    dispatch({ type: ACTIONS.SET_INPUT, payload: value });
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
  }, [searchQuery, state.filter]);

  return (
    <Styled.Container>
      <Header />
      <SearchBar
        data={state.data}
        filter={state.filter}
        handleInputEvent={handleInputEvent}
        handleRemove={handleRemove}
        isShown={isShown}
        query={state.input}
        setIsShown={setIsShown}
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
