export type Data = {
  children?: [];
  description: string;
  dreyfus?: number;
  hasCertification?: boolean;
  id?: number;
  isFinished?: boolean;
  label: string;
  level?: number;
  other_resources?: any;
  parents?: [];
  slug?: string;
  title: string;
};

export interface ItemProps {
  description: string;
  handleFilter: (event: any) => void;
  id: string;
  label: string;
  query: string;
  title: string;
}

export interface SearchBarProps {
  data: Data;
  filter: string;
  handleInput: (event: React.FormEvent<HTMLInputElement>) => void;
  handleRemove: () => void;
  query: string;
  updateInput: (event: React.FormEvent<HTMLInputElement>) => void;
}

export interface TypeaheadDropdownProps {
  autoCompleteData: any;
  focusIndex: number;
  handleClick: (event: React.MouseEvent) => void;
  handleFocus: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  isFocused: boolean;
  isOpen: boolean;
  query: string;
}
