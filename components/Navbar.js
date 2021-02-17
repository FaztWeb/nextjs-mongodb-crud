import Link from "next/link";

const Navbar = () => (
  <nav className="navbar">
    <Link href="/">
      <a className="navbar-brand">Task App</a>
    </Link>
    <Link href="/new">
      <a className="create">Create Task</a>
    </Link>
  </nav>
);

export default Navbar;
