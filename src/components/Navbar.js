import { Menu, Container, Button } from "semantic-ui-react";
import Link from "next/link";
export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/tasks/new">new</Link>
        </li>
        <li>
          <Link href="/auth/login">login</Link>
        </li>
        <li>
          <Link href="/auth/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};
