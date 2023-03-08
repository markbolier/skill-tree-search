import { useReducer, useState, useEffect } from "react";
import Fuse from "fuse.js";

import { Action, ACTIONS, initialStateProps, ItemProps } from "./types/types";
import { Header } from "./components/header";
import { Item } from "./components/item";
import { Pagination } from "./components/pagination";
import { SearchBar } from "./components/search-bar";
import { useDebounce } from "./utils";
import * as Styled from "./App.styled";
import mockData from "../src/mock-data/example-data.json";

export const App = () => {
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
  const [itemsPerPage] = useState(5);
  const [pageFirstInView, setPageFirstInView] = useState(1);
  const [pageLastInView, setPageLastInView] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const amountOfPages = Math.ceil(state.results.length / itemsPerPage);
  const currentItems = state.results.slice(indexOfFirstItem, indexOfLastItem);

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const filter = event.currentTarget.innerText.substring(1);
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value.startsWith("#")) {
      if (value.endsWith(" ")) {
        const filter = value.slice(1, -1);
        dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
        dispatch({ type: ACTIONS.SET_INPUT, payload: "" });
      } else {
        dispatch({ type: ACTIONS.SET_INPUT, payload: value });
      }
    } else {
      dispatch({ type: ACTIONS.SET_INPUT, payload: value });
    }
  };

  const handleRemove = () => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: "" });
  };

  const nextPage = () => {
    if (currentPage >= amountOfPages) {
      return;
    }
    if (currentPage > 4 && currentPage + 4 < amountOfPages) {
      setPageLastInView(currentPage + 5);
      setPageFirstInView(currentPage - 4);
    } else if (currentPage < 5) {
      setPageLastInView(10);
      setPageFirstInView(1);
    }
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage === 1) {
      return;
    }
    if (currentPage > 5 && currentPage + 5 < amountOfPages) {
      setPageLastInView(currentPage + 4);
      setPageFirstInView(currentPage - 5);
    } else if (currentPage < 6) {
      setPageLastInView(10);
      setPageFirstInView(1);
    }
    setCurrentPage(currentPage - 1);
  };

  const resetPageHandling = () => {
    setPageLastInView(10);
    setPageFirstInView(1);
    setCurrentPage(1);
  };

  const updateSearchResults = () => {
    const input = state.input.trim().split(" ");
    const searchTerms = input.filter((term: string) => !term.startsWith("#"));
    const results =
      searchTerms[0] === "" && state.filter.length > 0
        ? fuse
            .search(state.filter)
            .filter(
              (match: Fuse.FuseResult<any>) =>
                state.filter.toLowerCase() === match.item.label.toLowerCase(),
            )
        : searchTerms
            .flatMap((term: string) => fuse.search(term))
            .filter(
              (match: Fuse.FuseResult<any>) =>
                !state.filter.length ||
                state.filter.toLowerCase() === match.item.label.toLowerCase(),
            );
    dispatch({ type: ACTIONS.SET_RESULTS, payload: results });
    setCurrentPage(1);
  };

  const updateInput = (value: string) => {
    dispatch({ type: ACTIONS.SET_INPUT, payload: value });
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
    updateSearchResults();
    resetPageHandling();
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
        {state.results.length > 0 && (
          <span>
            {state.results.length} {state.results.length > 1 ? "results" : "result"}
            {state.input.length > 0 && " for "}
            <Styled.Bold>{state.input}</Styled.Bold>
            {state.filter && (
              <>
                {" in"}
                <Styled.Label> #{state.filter}</Styled.Label>
              </>
            )}
          </span>
        )}
        {currentItems.map((hit: Fuse.FuseResult<ItemProps>) => {
          return (
            <Item
              description={hit.item.description}
              handleFilter={handleFilter}
              id={`${hit.refIndex}`}
              key={hit.refIndex}
              label={hit.item.label}
              query={state.input}
              title={hit.item.title}
            />
          );
        })}
        {state.results.length !== itemsPerPage && state.results.length > itemsPerPage ? (
          <Pagination
            amountOfPages={amountOfPages}
            currentPage={currentPage}
            nextPage={nextPage}
            pageFirstInView={pageFirstInView}
            pageLastInView={pageLastInView}
            previousPage={previousPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
      </Styled.List>
    </Styled.Container>
  );
};
