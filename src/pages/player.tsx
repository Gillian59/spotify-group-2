import { NextPage, GetServerSidePropsContext } from "next";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import Cookies from "cookies";
import useSWR from "swr";
import { Layout } from "../components/Layout";
import React from "react";
import { SpotifyState, SpotifyUser } from "../types/spotify";
import { millisToMinutesAndSeconds } from "../utils/durationSong";
import { play, pause, addToQueue, previous, next } from "../utils/player-service";

interface Props {
  user: SpotifyUser;
  accessToken: string;
  isDisplay: string;
  setIsDisplay: any;
}

const Player: NextPage<Props> = ({ accessToken }) => {
  const { data, error } = useSWR("/api/get-user-info");
  const [paused, setPaused] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState("");
  const [currentDuration, setCurrentDuration] = React.useState(0);
  const [deviceId, player] = useSpotifyPlayer(accessToken);
  const [shuffle, setShuffle] = React.useState(false);
  const [repeatMode, setRepeatMode] = React.useState(1);
  const [isDisplay, setIsDisplay] = React.useState("");
  const [artistName, setArtistName] = React.useState("");
  const [cover, setcover] = React.useState("");

  React.useEffect(() => {
    const playerStateChanged = (state: SpotifyState) => {
      setPaused(state.paused);
      setShuffle(state.shuffle);
      setRepeatMode(state.repeat_mode);
      setCurrentTrack(state.track_window.current_track.name);
      setCurrentDuration(state.track_window.current_track.duration_ms);
      setArtistName(state.track_window.current_track.artists[0].name);
      setcover(state.track_window.current_track.album.images[0].url);
    };
    if (player) {
      player.addListener("player_state_changed", playerStateChanged);
    }
    return () => {
      if (player) {
        player.removeListener("player_state_changed", playerStateChanged);
      }
    };
  }, [player]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout
      isLoggedIn={true}
      spotifyLoginUrl=""
      isDisplay={isDisplay}
      setIsDisplay={setIsDisplay}
      accessToken={accessToken}
    >
      <footer id="playerFooter">
        <div className="container" id="songInformations">
          <img id="albcover" src={cover}></img>
          <div className="posartinfos">
            <p>{currentTrack}</p>
            <p id="posnameart">{artistName}</p>
          </div>
          <p>{millisToMinutesAndSeconds(currentDuration)}</p>
          <a
            className="buttons"
            onClick={() => {
              addToQueue(accessToken, deviceId);
            }}
          >
            <i className="far fa-plus-square"></i>{" "}
          </a>
        </div>
        <div className="container">
          <a
            className="buttons"
            onClick={() => {
              setShuffle(!shuffle);
            }}
          >
            {!shuffle ? <i id="shuffleOff" className="fas fa-random"></i> : <i className="fas fa-random"></i>}
          </a>
          <a
            className="buttons"
            onClick={() => {
              previous(accessToken, deviceId);
            }}
          >
            <i className="fas fa-step-backward"></i>
          </a>
          <a
            className="buttons"
            onClick={() => {
              paused ? play(accessToken, deviceId) : pause(accessToken, deviceId);
            }}
          >
            {paused ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
          </a>
          <a
            className="buttons"
            onClick={() => {
              next(accessToken, deviceId);
            }}
          >
            <i className="fas fa-step-forward"></i>
          </a>
          <a
            className="buttons"
            onClick={() => {
              repeatMode === 2 ? setRepeatMode(0) : setRepeatMode(repeatMode + 1);
            }}
          >
            <i className="fas fa-redo"></i> : {repeatMode}
          </a>
        </div>
      </footer>
    </Layout>
  );
};
export default Player;

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<unknown> => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("spot-next");
  if (accessToken) {
    return { props: { accessToken } };
  } else {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};
