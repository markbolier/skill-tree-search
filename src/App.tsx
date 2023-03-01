import { useReducer, useState, useEffect } from "react";
import Fuse from "fuse.js";

import { Header } from "./components/header";
import { Action, ACTIONS, DataProps, initialStateProps, ItemProps } from "./types/types";
import { Item } from "./components/item";
import { SearchBar } from "./components/search-bar";
import * as Styled from "./App.styled";
import mockData from "../src/mock-data/example-data.json";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const initialState = {
    data: mockData,
    filter: "",
    input: "",
    results: [],
  };

  const reducer = (state: initialStateProps, action: Action) => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // const indexOfLastItem = currentPage * recordsPerPage;
  // const indexOfFirstItem = indexOfLastItem - recordsPerPage;

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const filter = event.currentTarget.innerText.substring(1);
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    dispatch({ type: ACTIONS.SET_INPUT, payload: value });
    setItemsPerPage(5);
  };

  const loadMore = () => {
    setItemsPerPage(itemsPerPage + 5);
  };

  const handleRemove = () => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: "" });
  };

  interface item {}

  const showResults = () => {
    const searchTerms = state.input.trim().split(" ");
    const results = searchTerms
      .flatMap((term: string) => fuse.search(term))
      .filter(
        (result: Fuse.FuseResult<any>) => !state.filter || result.item.label === state.filter,
      );
    dispatch({ type: ACTIONS.SET_RESULTS, payload: results });
    console.log(results);
  };

  const updateInput = (value: string) => {
    dispatch({ type: ACTIONS.SET_INPUT, payload: value });
    setItemsPerPage(5);
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
        handleInput={handleInput}
        handleRemove={handleRemove}
        query={state.input}
        updateInput={updateInput}
      />
      <Styled.List>
        {state.results
          .map((hit: Fuse.FuseResult<ItemProps>) => {
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
          .slice(0, itemsPerPage)}
        {state.results.length !== itemsPerPage && state.results.length > itemsPerPage && (
          <Styled.Button onClick={loadMore}>Load more</Styled.Button>
        )}
      </Styled.List>
    </Styled.Container>
  );
};

export default App;
