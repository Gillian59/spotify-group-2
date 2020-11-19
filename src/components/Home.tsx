import React from "react";
//import Link from "next/link";
import getRecentlyPlayed from "../utils/home-service";
import { SpotifyRecentlyPlayed } from "../types/spotify.d";
import Card from "react-bootstrap/Card";

type Props = {
  accessToken: string;
};

export const Home: React.FC<Props> = ({ accessToken }): JSX.Element => {
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
          recentlyPlayed.items.map((item) => {
            return (
              <a href={item.track.href} key={item.track.id}>
                <Card className="m-1 bg-dark text-white" style={{ width: "12rem", height: "21rem" }}>
                  <Card.Img variant="top" src={item.track.album.images[0].url} />
                  <Card.Body className="text-center">
                    <Card.Title className="h6">{item.track.name}</Card.Title>
                    <p>{item.track.artists[0].name}</p>
                  </Card.Body>
                </Card>
              </a>
            );
          })}
      </div>
    </div>
  );
};
export default Home;
