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

  React.useEffect(() => {
    const playerStateChanged = (state: SpotifyState) => {
      setPaused(state.paused);
      setShuffle(state.shuffle);
      setRepeatMode(state.repeat_mode);
      setCurrentTrack(state.track_window.current_track.name);
      setCurrentDuration(state.track_window.current_track.duration_ms);
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
  const user = data;

  return (
    <Layout
      isLoggedIn={true}
      spotifyLoginUrl=""
      accessToken={accessToken}
      isDisplay={isDisplay}
      setIsDisplay={setIsDisplay}
    >
      <h1>Player</h1>
      <p>Welcome {user && user.display_name}</p>
      <footer id="playerFooter">
        <div className="container" id="songInformations">
          <p>{currentTrack}</p>
          <p>{millisToMinutesAndSeconds(currentDuration)}</p>
          <button
            onClick={() => {
              addToQueue(accessToken, deviceId);
            }}
          >
            Add to queue
          </button>
        </div>
        <div className="container">
          <button
            onClick={() => {
              setShuffle(!shuffle);
            }}
          >
            {!shuffle ? "Shuffle OFF" : "Shuffle ON"}
          </button>
          <button
            onClick={() => {
              previous(accessToken, deviceId);
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              paused ? play(accessToken, deviceId) : pause(accessToken, deviceId);
            }}
          >
            {paused ? "play" : "pause"}
          </button>
          <button
            onClick={() => {
              next(accessToken, deviceId);
            }}
          >
            next
          </button>
          <button
            onClick={() => {
              repeatMode === 2 ? setRepeatMode(0) : setRepeatMode(repeatMode + 1);
            }}
          >
            Repeat Mode : {repeatMode}
          </button>
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
