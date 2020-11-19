const currentUserPlaylists = (accessToken: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/me/playlists`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default currentUserPlaylists;
