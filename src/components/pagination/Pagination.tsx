import { PaginationProps } from "../../types/types";
import * as Styled from "./Pagination.styled";

export const Pagination = ({
  amountOfPages,
  currentPage,
  nextPage,
  previousPage,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers = [...Array(amountOfPages + 1).keys()].slice(1);
  return (
    <Styled.Container>
      <Styled.Button>
        <li onClick={previousPage}>
          <span>Previous</span>
        </li>
      </Styled.Button>
      {pageNumbers.map((pageNumber) => {
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
      <Styled.Button>
        <li onClick={nextPage}>
          <span>Next</span>
        </li>
      </Styled.Button>
    </Styled.Container>
  );
};
