import { useState } from "react";
import { PaginationProps } from "../../types/types";
import * as Styled from "./Pagination.styled";

export const Pagination = ({
  amountOfPages,
  currentPage,
  nextPage,
  pageFirstInView,
  pageLastInView,
  previousPage,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers = [...Array(amountOfPages + 1).keys()].slice(1);
  const pagesWithLimit = pageNumbers.slice(pageFirstInView - 1, pageLastInView);

  return (
    <Styled.Container>
      {currentPage !== 1 ? (
        <Styled.Button onClick={previousPage}>
          <span>Previous</span>
        </Styled.Button>
      ) : null}
      {pagesWithLimit.map((pageNumber) => {
        return (
          <Styled.Button key={pageNumber}>
            <Styled.Number
              currentPage={currentPage}
              pageNumber={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </Styled.Number>
          </Styled.Button>
        );
      })}
      {currentPage !== pageNumbers.length ? (
        <Styled.Button onClick={nextPage}>
          <span>Next</span>
        </Styled.Button>
      ) : null}
    </Styled.Container>
  );
};
