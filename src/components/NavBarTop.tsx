import React from "react";
import Link from "next/link";
import useSWR from "swr";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl: string;
};

export const NavBarTop: React.FC<Props> = ({ isLoggedIn, spotifyLoginUrl }) => {
  const { data } = useSWR("/api/get-user-info");
  const user = data;
  return (
    <div className="d-flex justify-content-end navBarTop">
      {isLoggedIn ? <p>Welcome {user && user.display_name}</p> : null}
      <Link href={isLoggedIn ? "/api/logout" : spotifyLoginUrl}>
        <p>
          <span className="CSSsurvol">{isLoggedIn ? "Déconnexion" : "Connexion"}</span>
        </p>
      </Link>
    </div>
  );
};
