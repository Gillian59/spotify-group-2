import React from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import { NavBarTop } from "./NavBarTop";
import Search from "../components/Search";
import Library from "../components/Library";
import Home from "../components/Home";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl: string;
  accessToken: string;
  isDisplay?: string;
  setIsDisplay?: any;
  deviceId: string;
};

export const Layout: React.FC<Props> = ({
  children,
  isLoggedIn,
  spotifyLoginUrl,
  isDisplay,
  setIsDisplay,
  accessToken,
  deviceId,
}) => {
  return (
    <>
      <Head>
        <title>MySpotify</title>
        <link rel="icon" href="/images/spotifyicon.png" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" />
      </Head>
      <NavBar accessToken={accessToken} isLoggedIn={isLoggedIn} isDisplay={isDisplay} setIsDisplay={setIsDisplay} />
      <NavBarTop isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl} />
      <main className="mr-5">
        {children}
        {isDisplay === "home" && <Home accessToken={accessToken} deviceId={deviceId} />}
        {isDisplay === "search" && <Search accessToken={accessToken} />}
        {isDisplay === "library" && <Library />}
      </main>
    </>
  );
};
