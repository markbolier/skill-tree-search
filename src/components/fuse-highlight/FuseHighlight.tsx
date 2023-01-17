import Fuse from "fuse.js";

// Recursively builds JSX output adding `<mark>` tags around matches
const highlight = (value, indices = [], i = 1) => {
  const pair = indices[indices.length - i];
  return !pair ? (
    value
  ) : (
    <>
      {highlight(value.substring(0, pair[0]), indices, i + 1)}
      <mark>{value.substring(pair[0], pair[1] + 1)}</mark>
      {value.substring(pair[1] + 1)}
    </>
  );
};

export const FuseHighlight = ({ hit, target }) => {
  const matches =
    typeof hit.item === "string" ? hit.matches?.[0] : hit.matches?.find((m) => m.key === target);
  const fallback = typeof hit.item === "string" ? hit.item : Fuse.config.getFn(hit.item, target);
  return highlight(matches?.value || fallback, matches?.indices);
};

// export default FuseHighlight;
