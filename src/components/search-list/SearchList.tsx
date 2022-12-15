import * as Styled from "./SearchList.styled";
import mockData from "../../mock-data/example-data.json";

export const SearchList = () => {
  return (
    <ul>
      {mockData.map((data) => (
        <li>{data.title}</li>
      ))}
      <li></li>
    </ul>
  );
};

export default SearchList;
