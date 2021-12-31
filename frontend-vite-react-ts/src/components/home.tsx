import React from "react";
import {
  Badge,
  ToggleButton,
  Button,
  Form,
  FormControl,
  Table,
} from "react-bootstrap";

export const Home: React.FC = () => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <div>
      <div
        //
        className="mt-2 mx-1"
      >
        <ToggleButton
          className="mb-2 mx-1"
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          Search
          {' '}
          <Badge>1</Badge>
        </ToggleButton>

        <ToggleButton
          className="mb-2 mx-1"
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          Shopping
          {' '}
          <Badge>2</Badge>
        </ToggleButton>

        <ToggleButton
          className="mb-2 mx-1"
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          Linux
          {' '}
          <Badge>2</Badge>
        </ToggleButton>
      </div>

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
