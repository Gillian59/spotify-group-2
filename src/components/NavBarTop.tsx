import React from "react";
import Link from "next/link";

const styles = {
  navTop: {
    color: "white",
    backgroundColor: "black",
    width: "100%",
    height: "80px",
    fontSize: "25px",
    cursor: "pointer",
    paddingTop: "18px",
  },
};

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl: string;
};

export const NavBarTop: React.FC<Props> = ({ isLoggedIn, spotifyLoginUrl }) => {
  return (
    <div className="d-flex justify-content-end" style={styles.navTop}>
      <Link href={isLoggedIn ? "/api/logout" : spotifyLoginUrl}>
        <p>
          <span className="CSSsurvol">{isLoggedIn ? "logout" : "login"}</span>
        </p>
      </Link>
    </div>
  );
};
