import React from "react";
//import Link from "next/link";
import getRecentlyPlayed from "../utils/home-service";

type Props = {
  accessToken: string;
};

export const Home: React.FC<Props> = ({ accessToken }): JSX.Element => {
  const [recentlyPlayed, setRecentlyPlayed] = React.useState(null);

  React.useEffect(() => {
    getRecentlyPlayed(accessToken)
      .then((response) => response.json())
      .then((data) => {
        setRecentlyPlayed(data);
        console.log(data);
        console.log(recentlyPlayed);
      });
  }, []);

  return (
    <div>
      <h1>PAGE Home</h1>
    </div>
  );
};
export default Home;
