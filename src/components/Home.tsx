import React from "react";
//import Link from "next/link";
import getRecentlyPlayed from "../utils/home-service";
import { SpotifyRecentlyPlayed } from "../types/spotify.d";
import Card from "react-bootstrap/Card";
import { play } from "../utils/player-service";

export let uriSpotify: string;

type Props = {
  accessToken: string;
  deviceId: string;
};

export const Home: React.FC<Props> = ({ accessToken, deviceId }): JSX.Element => {
  const [recentlyPlayed, setRecentlyPlayed] = React.useState<SpotifyRecentlyPlayed>();

  React.useEffect(() => {
    getRecentlyPlayed(accessToken)
      .then((response) => response.json())
      .then((data) => {
        setRecentlyPlayed(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="mt-2 mb-5 ml-5">
      <h1>PAGE Home</h1>
      <h2>Ecouté récemment</h2>
      <div className="row">
        {recentlyPlayed &&
          recentlyPlayed.items.map((item, index) => {
            return (
              <Card
                key={item.track.id + index}
                className="m-1 bg-dark text-white"
                style={{ width: "12rem", height: "21rem" }}
                onClick={() => {
                  uriSpotify = item.track.uri;
                  play(accessToken, deviceId, item.track.uri);
                }}
              >
                <Card.Img variant="top" src={item.track.album.images[0].url} />
                <Card.Body className="text-center">
                  <Card.Title className="h6">{item.track.name}</Card.Title>
                  <p>{item.track.artists[0].name}</p>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
};
export default Home;
