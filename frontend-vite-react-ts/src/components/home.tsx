import React from "react";
import {
  Badge,
  Button,
  Form,
  FormControl,
  Table,
} from "react-bootstrap";

import { Categories } from "./categories";

export const Home: React.FC<{ data: any }> = ({ data }) => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <div>
      <Categories bookmarks={data.data.user.bookmarks}></Categories>

      <Form className="d-flex mb-1">
        <FormControl
          //
          className="ms-2 me-1"
          type="search"
          placeholder="Filter"
        />
        <Button
          //
          className="ms-1 me-2"
        >
          Search
        </Button>
      </Form>

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
        <tbody>
          <tr>
            <td>Google</td>
            <td>https://google.com</td>
            <td>
              <Badge pill bg="primary">
                Search
              </Badge>{" "}
            </td>
          </tr>
          <tr>
            <td>Amazon</td>
            <td>https://amazon.com</td>
            <td>
              <Badge pill bg="primary">
                Shopping
              </Badge>{" "}
            </td>
          </tr>
          <tr>
            <td>Arch Wiki</td>
            <td>https://wiki.archlinux.org</td>
            <td>
              <Badge pill bg="primary">
                Linux
              </Badge>{" "}
            </td>
          </tr>
          <tr>
            <td>System76</td>
            <td>https://system76.com</td>
            <td>
              <Badge pill bg="primary">
                Linux
              </Badge>{" "}
              <Badge pill bg="primary">
                Shopping
              </Badge>{" "}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
