const getRecentlyPlayed = (accessToken: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/me/player/recently-played`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default getRecentlyPlayed;
