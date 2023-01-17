import Fuse from "fuse.js";

import * as Styled from "./FuseHighlight.styled";

const highlight: any = (value: string, indices = [], i = 1) => {
  const pair = indices[indices.length - i];

  return !pair ? (
    value
  ) : (
    <>
      {highlight(value.substring(0, pair[0]), indices, i + 1)}
      <Styled.Match>{value.substring(pair[0], pair[1] + 1)}</Styled.Match>
      {value.substring(pair[1] + 1)}
    </>
  );
};

export const FuseHighlight = ({ hit, target }: any) => {
  const matches =
    typeof hit.item === "string"
      ? hit.matches?.[0]
      : hit.matches?.find((match: { key: number }) => match.key === target);
  const fallback = typeof hit.item === "string" ? hit.item : Fuse.config.getFn(hit.item, target);
  return highlight(matches?.value || fallback, matches?.indices);
};
