import React from "react";
//import Link from "next/link";
import { research } from "../components/NavBar";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl: string;
};

const XXSearch: React.FC<Props> = () => {
  console.log(research);
  return <div>{research ? "vrai" : "faux"}</div>;
};
export default XXSearch;
