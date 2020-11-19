import { GetServerSideProps } from "next";
import React from "react";
import { categoriePlaylist } from "../utils/player-service";
import Cookies from "cookies";

type Playlist = {
  id: string;
  name: string;
};

const affPlaylist: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
  const TRACE = true;
  if (TRACE) {
    console.log("arrivee typeof datas", typeof playlist);
    console.log(playlist);
  }

  return <div className="container">COUCOU</div>;
};
export default affPlaylist;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("spot-next");
  const TRACE = true;
  const categoryplaylist = context.params;

  if (TRACE) {
    console.log("valeur de params = ", categoryplaylist);
    console.log("accessToken", accessToken);
  }

  if (accessToken) {
    categoriePlaylist(accessToken)
      .then((response) => response.json())
      .then((playlist) => {
        console.log("SEARCH[DATA]playlist", playlist);
        return {
          props: {
            playlist,
          },
        };
      });
  }
};
