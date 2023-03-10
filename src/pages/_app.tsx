import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import type { NextComponentType } from "next"; //Import Component type
import { trpc } from "../utils/trpc";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

import "../styles/globals.css";
import { ThemeProvider } from "../lib/theme";

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

export default trpc.withTRPC(MyApp);
