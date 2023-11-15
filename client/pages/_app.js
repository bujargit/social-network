import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link rel="stylesheet" href="/css/styles.css" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </Head>
      <Nav />
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
