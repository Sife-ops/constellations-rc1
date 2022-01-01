import React from "react";
import { Badge, Button, Form, FormControl, Table } from "react-bootstrap";
import { Categories } from "./categories";
import { Bookmark } from "../utility/types";

export const Home: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <Categories bookmarks={data.data.user.bookmarks} />
      <Filter bookmarks={data.data.user.bookmarks} />
    </div>
  );
};

const Filter: React.FC<{ bookmarks: Bookmark[] }> = ({ bookmarks }) => {
  const [filter, setFilter] = React.useState<string>("");

  const filtered: Bookmark[] = bookmarks.filter((e) => {
    if (filter === "") {
      return e;
    }
    return e.description.includes(filter);
  });

  return (
    <div>
      <Form className="d-flex mb-1 mx-1">
        <FormControl
          className="mx-1"
          type="search"
          placeholder="Filter"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        {/* todo: filter criteria dropdown button */}
        {/* <Button className="mx-1">Search</Button> */}
      </Form>

      <FilterTable bookmarks={filtered} />
    </div>
  );
};

const FilterTable: React.FC<{ bookmarks: Bookmark[] }> = ({ bookmarks }) => {
  const rows = bookmarks.map((e) => (
    <tr key={e.id}>
      <td>{e.description}</td>
      <td>{e.url}</td>
      <td>
        {e.categories.map((e) => (
          <Badge key={e.id} pill bg="primary">
            {e.name}
          </Badge>
        ))}
      </td>
    </tr>
  ));

  return (
    <Table
      //
      striped
      className="mt-1"
    >
      <thead>
        <tr>
          <th>Description</th>
          <th>URL</th>
          <th>Categories</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
