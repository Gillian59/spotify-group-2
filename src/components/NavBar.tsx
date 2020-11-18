import React from "react";
import Link from "next/link";

type Props = {
  isLoggedIn?: boolean;
  spotifyLoginUrl?: string;
  isDisplay: string;
  setIsDisplay: any;
};

const NavBar: React.FC<Props> = ({ setIsDisplay }) => {
  return (
    <>
      <div className="nav">
        <nav>
          <img id="logo" src="/images/logo.png" />
          <div className="liens">
            <div className="lien">
              <Link href="/">
                <span className="CSSicons">
                  <i className="fas fa-home"></i>
                  Accueil
                </span>
              </Link>
            </div>
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
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
