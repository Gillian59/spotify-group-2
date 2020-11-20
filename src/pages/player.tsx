import { NextPage, GetServerSidePropsContext } from "next";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import Cookies from "cookies";
import useSWR from "swr";
import { Layout } from "../components/Layout";
import React from "react";
import { SpotifyState, SpotifyUser } from "../types/spotify";
import { millisToMinutesAndSeconds } from "../utils/durationSong";
import { play, pause, addToQueue, previous, next } from "../utils/player-service";
import { uriSpotify } from "../components/Home";

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
      deviceId={deviceId}
    >
      <footer id="playerFooter">
        <div className="d-flex align-items-center w-100">
          <div className="footer-right row">
            <img id="albcover" src={cover} className="mr-3 ml-5"></img>
            <div className="posartinfos">
              <p className="mr-3">{currentTrack}</p>
              <p className="mr-3" id="posnameart">
                {artistName}
              </p>
            </div>
            <p className="mr-4">{millisToMinutesAndSeconds(currentDuration)}</p>
            <a
              className="buttons"
              onClick={() => {
                addToQueue(accessToken, deviceId);
              }}
            >
              <i className="far fa-plus-square"></i>{" "}
            </a>
          </div>
          <div className="footer-center">
            <a
              className="buttons mr-4"
              onClick={() => {
                setShuffle(!shuffle);
              }}
            >
              {!shuffle ? <i id="shuffleOff" className="fas fa-random"></i> : <i className="fas fa-random"></i>}
            </a>
            <a
              className="buttons mr-4"
              onClick={() => {
                previous(accessToken, deviceId);
              }}
            >
              <i className="fas fa-step-backward"></i>
            </a>
            <a
              className="buttons mr-4"
              onClick={() => {
                paused ? play(accessToken, deviceId, uriSpotify) : pause(accessToken, deviceId);
              }}
            >
              {paused ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
            </a>
            <a
              className="buttons mr-4"
              onClick={() => {
                next(accessToken, deviceId);
              }}
            >
              <i className="fas fa-step-forward"></i>
            </a>
            <a
              className="buttons mr-4"
              onClick={() => {
                repeatMode === 2 ? setRepeatMode(0) : setRepeatMode(repeatMode + 1);
              }}
            >
              <i className="fas fa-redo"></i> : {repeatMode}
            </a>
          </div>
          <div className="footer-left">
            <i className="fas fa-volume-up"></i>
          </div>
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
