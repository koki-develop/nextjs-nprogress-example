import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useCallback, useEffect } from "react";
import "nprogress/nprogress.css";
import "../styles/globals.css";

nProgress.configure({
  showSpinner: false,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const handleRouteStart = useCallback(() => nProgress.start(), []);
  const handleRouteEnd = useCallback(() => nProgress.done(), []);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteEnd);
    router.events.on("routeChangeError", handleRouteEnd);
    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteEnd);
      router.events.off("routeChangeError", handleRouteEnd);
    };
  }, [handleRouteEnd, handleRouteStart, router.events]);

  return <Component {...pageProps} />;
};

export default MyApp;
