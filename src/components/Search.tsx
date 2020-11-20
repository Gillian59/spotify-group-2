import React from "react";
import { categorieAll } from "../utils/player-service";
import { SpotifyCategory } from "../types/spotify.d";
import Card from "react-bootstrap/Card";

interface Props {
  accessToken: string;
}

export const Search: React.FC<Props> = ({ accessToken }) => {
  const [category, setCategory] = React.useState<SpotifyCategory>();

  React.useEffect(() => {
    categorieAll(accessToken)
      .then((response) => response.json())
      .then((dataCategorie) => {
        setCategory(dataCategorie);
      });
  }, []);

  return (
    <div className="mt-2 mb-5 ml-5">
      <h2>Parcourir tout</h2>
      <div className="row">
        {category
          ? category.categories.items.map((item) => {
              return (
                <Card key={item.id} className="m-1 bg-dark text-white" style={{ width: "12rem", height: "18rem" }}>
                  <Card.Img variant="top" src={item.icons[0].url} />
                  <Card.Body className="text-center">
                    <Card.Title className="h6">{item.name}</Card.Title>
                  </Card.Body>
                </Card>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default Search;
