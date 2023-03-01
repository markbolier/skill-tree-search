export type Action = SetFilterAction | SetInputAction | SetResultsAction;

export enum ACTIONS {
  SET_FILTER = "SET_FILTER",
  SET_INPUT = "SET_INPUT",
  SET_RESULTS = "SET_RESULTS",
}

export interface DataProps {
  children?: any[];
  description: string;
  dreyfus?: number;
  hasCertification?: boolean;
  id?: number;
  isFinished?: boolean;
  label: string;
  level?: number;
  other_resources?: any;
  parents?: any[];
  slug?: string;
  title: string;
}

export interface initialStateProps {
  data: any;
  filter: string;
  input: string;
  results: [];
}

export interface ItemProps {
  description: string;
  handleFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
  label: string;
  query: string;
  title: string;
}

export interface PaginationProps {
  amountOfPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  nextPage: () => void;
  previousPage: () => void;
}

export interface SearchBarProps {
  data: DataProps[];
  filter: string;
  handleInput: (event: React.FormEvent<HTMLInputElement>) => void;
  handleRemove: () => void;
  query: string;
  updateInput: (value: string) => void;
}

interface SetFilterAction {
  type: typeof ACTIONS.SET_FILTER;
  payload: string;
}

interface SetInputAction {
  type: typeof ACTIONS.SET_INPUT;
  payload: string;
}

interface SetResultsAction {
  type: typeof ACTIONS.SET_RESULTS;
  payload: any;
}

export interface TypeaheadDropdownProps {
  autoCompleteData: string[];
  focusIndex: number;
  handleClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  handleFocus: (index: number) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLLIElement>) => void;
  isOpen: boolean;
  query: string;
}
