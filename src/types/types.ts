export type Data = {
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
};

export interface ItemProps {
  description: string;
  handleFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
  label: string;
  query: string;
  title: string;
}

export interface SearchBarProps {
  data: Data[];
  filter: string;
  handleInputEvent: (event: React.FormEvent<HTMLInputElement>) => void;
  handleRemove: () => void;
  isShown: boolean;
  query: string;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  updateInput: (value: string) => void;
}

export interface TypeaheadDropdownProps {
  autoCompleteData: string[];
  focusIndex: number;
  handleClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  // handleFocus: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLLIElement>) => void;
  // isFocused: boolean;
  isOpen: boolean;
  query: string;
}
