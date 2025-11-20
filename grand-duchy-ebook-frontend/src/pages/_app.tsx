import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

// ? Styles Import
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import Loader from "@/components/common/Loader";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Head>
          <title>The Grand Duchy</title>
          <meta
            name="description"
            content="Harsh fantasy world. Prejudice, trauma, resilience tested. In 'The Balance,' a lone healer, facing loss & isolation, confronts a growing, inescapable darkness. Can they endure? Read now!"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          <meta
            name="keywords"
            content="Interactive ebook, Serialized novel, Read novel online, Digital book, Interactive novel, Video book, Novel with visuals / Book with images, Bookmarkable ebook, Next-gen reading / New generation reading, Serial novel / Episodic novel, Chapter by chapter novel, Online novel, Digital publishing, Unique reading experience, Interactive fiction, Multimedia book, The Balance: Dark Fantasy, Betrayal on the Border, A Healer's Dark Journey, The Grand Duchy: The Balance, Norarmu's Ordeal Begins, Horror Meets Fantasy Here, Grand Duchy of Aler, Absolute Rule over Shadia"
          />
          <meta name="author" content="Sabri BÜLBÜL" />
          <meta property="og:title" content="The Grand Duchy" />
          <meta
            property="og:description"
            content="Dive into the realm of The Grand Duchy, a fantasy novel series."
          />
          <meta
            property="og:image"
            content="https://i.ibb.co.com/Cp63yt3t/the-grand-dutchy.jpg"
          />
          <meta property="og:url" content="https://thegranduchy.com/" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* Body Section */}
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </Provider>
  );
}
