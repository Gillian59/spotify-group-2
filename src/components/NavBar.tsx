import React from "react";
import Link from "next/link";

const NavBar = (): JSX.Element => {
  return (
    <>
      <div className="nav">
        <nav>
          <img id="logo" src="logo.png" />
          <div className="p-3">
            <Link href="/">
              <span className="CSSicons">
                <i className="fas fa-home mr-3"></i>
                Accueil
              </span>
            </Link>
          </div>
          <div className="p-3">
            <Link href="/">
              <span className="CSSicons">
                <i className="fas fa-search mr-3"></i>
                Rechercher
              </span>
            </Link>
          </div>
          <div className="p-3">
            <Link href="/">
              <span className="CSSicons">
                <i className="fas fa-book-open mr-3"></i>
                Bibliothèque
              </span>
            </Link>
          </div>
          <div className="mt-3 p-3">
            <h4>PLAYLISTS</h4>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
