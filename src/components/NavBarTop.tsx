import React from "react";
import Link from "next/link";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl: string;
};

export const NavBarTop: React.FC<Props> = ({ isLoggedIn, spotifyLoginUrl }) => {
  return (
    <div className="d-flex justify-content-end navBarTop">
      <Link href={isLoggedIn ? "/api/logout" : spotifyLoginUrl}>
        <p>
          <span className="CSSsurvol">{isLoggedIn ? "logout" : "login"}</span>
        </p>
      </Link>
    </div>
  );
};
