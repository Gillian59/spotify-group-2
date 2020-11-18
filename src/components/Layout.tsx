import React from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import { NavBarTop } from "./NavBarTop";
import Search from "../components/Search";
import Library from "../components/Library";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl: string;
  isDisplay: string;
  setIsDisplay: any;
};

export const Layout: React.FC<Props> = ({ children, isLoggedIn, spotifyLoginUrl, isDisplay, setIsDisplay }) => {
  //console.log("LAYOUT --> valeur de isDisplay", isDisplay);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" />
      </Head>
      <NavBar isDisplay={isDisplay} setIsDisplay={setIsDisplay} />
      <NavBarTop isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl} />
      <main className="mr-5">
        {children}
        {isDisplay === "search" && <Search />}
        {isDisplay === "library" && <Library />}
      </main>
    </>
  );
};
