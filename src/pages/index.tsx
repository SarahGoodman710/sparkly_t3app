import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import LoadingDots from "../components/app/loading-dots";
import Image from "next/image";
import MyImage from "../images/logo.png";
import { FcGoogle } from "react-icons/fc";

const pageTitle = "Login";
const logo = "/favicon.ico";
const description = "Operations Management App";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" type="image/x-icon" href={logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={logo} />
        <meta name="theme-color" content="#7b46f6" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta itemProp="name" content={pageTitle} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={logo} />
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logo} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Elegance" />
        <meta name="twitter:creator" content="@StevenTey" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={logo} />
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={MyImage}
          alt="Operations Management App"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Operations Management App
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div>
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
}

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const [loading, setLoading] = useState(false);

  return (
    <button
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signIn("google");
      }}
      className={`${
        loading ? "cursor-not-allowed" : ""
      } h-22 group flex w-full items-center justify-center space-x-5 bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10`}
    >
      {loading ? (
        <LoadingDots color="#A8A8A8" />
      ) : (
        <div className="flex group-hover:animate-bounce">
          <FcGoogle size={25} />{" "}
          <span className="px-2">Continue with Google</span>
        </div>
      )}
    </button>
  );
};
