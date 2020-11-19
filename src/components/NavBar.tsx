import React from "react";
import Link from "next/link";
import currentUserPlaylists from "../utils/navbar-service";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl?: string;
  accessToken: string;
  isDisplay?: string;
  setIsDisplay?: any;
};

type Playlists = {
  items: {
    name: string;
  }[];
};

const NavBar: React.FC<Props> = ({ setIsDisplay, isLoggedIn, accessToken }) => {
  const [playlists, setPlaylists] = React.useState<Playlists | null>(null);

  React.useEffect(() => {
    currentUserPlaylists(accessToken)
      .then((response) => response.json())
      .then((data) => {
        setPlaylists(data);
      });
  }, []);

  return (
    <>
      <div className="nav">
        <nav>
          <img id="logo" src="/images/logo.png" />
          <div className="liens">
            {isLoggedIn && (
              <div className="lien">
                <Link href="/">
                  <span
                    className="CSSicons"
                    onClick={() => {
                      setIsDisplay("home");
                    }}
                  >
                    <i className="fas fa-home"></i>
                    Accueil
                  </span>
                </Link>
              </div>
            )}
            {isLoggedIn && (
              <div className="lien">
                <Link href="/">
                  <span
                    className="CSSicons"
                    onClick={() => {
                      setIsDisplay("search");
                    }}
                  >
                    <i className="fas fa-search"></i>
                    Rechercher
                  </span>
                </Link>
              </div>
            )}
            {isLoggedIn && (
              <div className="lien">
                <Link href="/">
                  <span
                    className="CSSicons"
                    onClick={() => {
                      setIsDisplay("library");
                    }}
                  >
                    <i className="fas fa-book-open"></i>
                    Bibliothèque
                  </span>
                </Link>
              </div>
            )}
          </div>
          <div className="playlists">
            <p>PLAYLISTS</p>
            <div>
              <Link href="/">
                <span className="CSSicons">
                  <i className="fas fa-plus-square plus"></i>
                  <span className="like">Créer une playlist</span>
                </span>
              </Link>
            </div>
            <div className="mt-3">
              <Link href="/">
                <span className="CSSicons">
                  <i className="fas fa-heart plus"></i>
                  <span className="like">Titres likés</span>
                </span>
              </Link>
            </div>
            <hr></hr>
          </div>
          {isLoggedIn && playlists && playlists.items && (
            <div className="playlistsList">
              {playlists.items.map((playlist) => {
                return <p key={playlist.name}>{playlist.name}</p>;
              })}
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
