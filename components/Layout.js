import Head from "next/head";
import Link from "next/link";
import { Grid, Button } from "semantic-ui-react";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Task App</title>
    </Head>
    <Navbar />
    {children}
  </>
);

export default Layout;
