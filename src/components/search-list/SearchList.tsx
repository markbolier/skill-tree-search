import * as Styled from "./SearchList.styled";
import mockData from "../../mock-data/example-data.json";

export const SearchList = () => {
  return (
    <ul>
      {mockData
        .filter((data) => data.title.toLowerCase().includes(query))
        .map((data) => (
          <li key={data.id}>{data.title}</li>
        ))}
      <li></li>
    </ul>
  );
};

export default SearchList;
