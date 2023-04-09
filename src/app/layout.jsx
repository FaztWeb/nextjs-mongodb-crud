import { Navbar } from "components/Navbar";
import "../styles/globals.css";

function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
