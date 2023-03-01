import { SetStateAction } from "react";
import * as Styled from "./Pagination.styled";

interface PaginationProps {
  amountOfPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  nextPage: () => void;
  previousPage: () => void;
}

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
        <Styled.Link onClick={previousPage}>
          <span>Previous</span>
        </Styled.Link>
      </Styled.Button>
      {pageNumbers.map((pageNumber) => {
        return (
          <Styled.Button key={pageNumber}>
            <Styled.Link onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</Styled.Link>
          </Styled.Button>
        );
      })}
      <Styled.Button>
        <Styled.Link onClick={nextPage}>
          <span>Next</span>
        </Styled.Link>
      </Styled.Button>
    </Styled.Container>
  );
};
