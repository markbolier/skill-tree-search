import Fuse from "fuse.js";

import * as Styled from "./FuseHighlight.styled";

const highlight: any = (value: string, position = [], i = 1) => {
  const pair = position[position.length - i];
  return !pair ? (
    value
  ) : (
    <>
      {highlight(value.substring(0, pair[0]), position, i + 1)}
      <Styled.Match>{value.substring(pair[0], pair[1] + 1)}</Styled.Match>
      {value.substring(pair[1] + 1)}
    </>
  );
};

export const FuseHighlight = ({ hit, target }: any) => {
  const matches = hit.matches?.find((match: { key: number }) => match.key === target);
  const fallback = Fuse.config.getFn(hit.item, target);
  return highlight(matches?.value || fallback, matches?.indices);
};
