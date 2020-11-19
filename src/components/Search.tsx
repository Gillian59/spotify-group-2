import React from "react";
import { categorie } from "../utils/player-service";
import { SpotifyCategory } from "../types/spotify.d";

interface Props {
  accessToken: string;
}

export const Search: React.FC<Props> = ({ accessToken }) => {
  const [category, setCategory] = React.useState<SpotifyCategory>();

  React.useEffect(() => {
    categorie(accessToken)
      .then((response) => response.json())
      .then((dataCategorie) => {
        console.log("SEARCH[DATA]dataCategorie", dataCategorie);
        setCategory(dataCategorie);
        console.log("SEARCH[DATA]category", category);
      });
  }, []);

  return (
    <div>
      <p>{category ? category.categories.href : null}</p>
    </div>
  );
};
export default Search;
