import { Input, Menu, Container, Button } from "semantic-ui-react";
import Link from "next/link";

const Navbar = () => (
  <Menu inverted borderless style={{ padding: ".3rem" }}>
    <Container>
      <Menu.Item name="home">
        <Link href="/">
          <img src="/react.svg" />
        </Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="new-task">
          <Link href="/new">
            <Button size="mini" primary>New Task</Button>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default Navbar;
