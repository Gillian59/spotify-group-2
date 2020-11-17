import React from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import { NavBarTop } from "./NavBarTop";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl: string;
};

export const Layout: React.FC<Props> = ({ children, isLoggedIn, spotifyLoginUrl }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" />
      </Head>
      <NavBar />
      <NavBarTop isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl} />
      <main className="mr-5">{children}</main>
    </>
  );
};
