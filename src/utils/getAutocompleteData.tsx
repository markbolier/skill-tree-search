// import mockData and Data types
import { DataProps } from "../types/types";
import mockData from "../../src/mock-data/example-data.json";

export const getAutocompleteData = (data: DataProps[], query: string): string[] => {
  const regex = /\b[^\s]+\b/g;
  const titles = [...data.map((obj: DataProps) => obj.title.toLowerCase())];
  const allWords = titles.map((title) => title.match(regex) || []).flat();
  const uniqueWords = [...new Set(allWords)];
  const autocompleteData = uniqueWords.filter((item: string) => item.includes(query.toLowerCase()));

  return autocompleteData;
};

export default getAutocompleteData;
