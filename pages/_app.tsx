import { AppProps } from "../node_modules/next/app";
import Head from "next/head";
import "../styles/globals.css";

import { useEffect, useState } from "react";
import ym from "react-yandex-metrika";
import { YMInitializer } from "react-yandex-metrika";
import router from "next/router";

router.events.on("routeChangeComplete", (url: string) => {
  if (typeof window !== "undefined") {
    ym("hit", url);
  }
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [url, setUrl] = useState("https://somehardcoded.url");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <>
      <Head>
        <title>MyTop - наш лучший топ</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content={"ru_RU"} />
      </Head>
      <YMInitializer
        accounts={[]}
        options={{ webvisor: true, defer: true }}
        version="2"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
