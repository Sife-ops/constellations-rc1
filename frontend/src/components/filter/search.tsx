import React from "react";
import { FormControl } from "react-bootstrap";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<Props> = ({ setSearch }) => {
  // todo: add bookmark modal input validation
  // todo: add bookmark modal confirm onClick
  // todo: add bookmark modal populate select options
  return (
    <FormControl
      className="mb-2"
      type="search"
      placeholder="Filter"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );
};
