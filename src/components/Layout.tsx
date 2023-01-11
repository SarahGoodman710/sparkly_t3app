import { PropsWithChildren, useEffect } from "react";
import Footer from "./footer";
import Nav from "./navbar";

type LayoutProps = {
  hideHeader?: boolean;
  hideFooter?: boolean;
  children?: React.ReactNode;
};

const Layout = ({
  hideHeader = false,
  hideFooter = false,
  children,
}: PropsWithChildren<LayoutProps>) => {
  useEffect(() => {
    const key = localStorage.getItem("supabaseDarkMode");
    if (!key) {
      // Default to dark mode if no preference config
      document.documentElement.className = "dark theme-dark";
    } else {
      document.documentElement.className = key === "true" ? "dark theme-dark" : "theme-light";
    }
  }, []);

  return (
    <>
      {!hideHeader && <Nav />}
      <div className="min-h-screen dark:bg-gray-800">
        <main>{children}</main>
      </div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
