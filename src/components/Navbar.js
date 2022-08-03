import { Menu, Container, Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <Menu
      inverted
      borderless
      attached
    >
      <Container>
        <Menu.Item name="home">
          <Link href="/">
            <img src="/react.svg" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              size="mini"
              primary
              onClick={() => router.push("/tasks/new")}
            >
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
        <div>
          <Link href="/auth/login">login</Link>
          <Link href="/auth/register">Register</Link>
        </div>
      </Container>
    </Menu>
  );
};
