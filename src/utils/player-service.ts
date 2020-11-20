const play = (accessToken: string, deviceId: string, uriSpotify: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      uris: [uriSpotify ? uriSpotify : "spotify:track:4uLU6hMCjMI75M1A2tKUQC"],
    }),
  });
};

const pause = (accessToken: string, deviceId: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const addToQueue = (accessToken: string, deviceId: string): Promise<Response> => {
  return fetch(
    `https://api.spotify.com/v1/me/player/queue?uri=spotify:track:1lCRw5FEZ1gPDNPzy1K4zW&device_id=${deviceId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

const previous = (accessToken: string, deviceId: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const next = (accessToken: string, deviceId: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const categorieAll = (accessToken: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/browse/categories?country=FR&limit=50`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const categoriePlaylist = (accessToken: string): Promise<Response> => {
  return fetch(`https://api.spotify.com/v1/browse/categories/pop/playlists?country=FR&limit=50`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export { play, pause, addToQueue, previous, next, categorieAll, categoriePlaylist };
