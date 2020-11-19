// Keep in mind that this has been make from studying a console.log output
// Don't put too much faith in it

type SpotifyTrack = {
  id: string;
  uri: string;
  type: "track" | "album" | "artist" | "user";
  linked_from_uri: any;
  linked_from: {
    uri: string | null;
    id: string | null;
  };
  media_type: string;
  name: string;
  duration_ms: number;
  artists: {
    name: string;
    uri: string;
  }[];
  album: {
    uri: string;
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
};
export type SpotifyState = {
  context: {
    uri: string | null;
    metadata: any;
  };
  bitrate: number;
  position: number;
  duration: number;
  paused: boolean;
  shuffle: boolean;
  repeat_mode: number;
  track_window: {
    current_track: SpotifyTrack;
    next_tracks: SpotifyTrack[];
    previous_tracks: SpotifyTrack[];
  };
  timestamp: number;
  restrictions: {
    disallow_pausing_reasons: string[];
    disallow_skipping_prev_reasons: string[];
  };
  disallows: {
    pausing: boolean;
    skipping_prev: boolean;
  };
};

export type SpotifyUser = {
  accessToken: string;
  display_name: string;
  email?: string;
  explicit_content?: Record<string, unknown>;
  external_urls?: Record<string, unknown>;
  followers?: Record<string, unknown>;
  href?: string;
  id?: string;
  images?: Record<string, unknown>[];
  product?: string;
  type?: string;
  uri?: string;
};

export type SpotifyCategory = {
  categories: {
    href: string;
    items: {
      href: string;
      icons: {
        height: number;
        url: string;
        width: number;
      }[];
      id: string;
      name: string;
    }[];
    limit: number;
    next: string;
    offset: number;
    previous?: string;
    total: number;
  };
};

export type SpotifyRecentlyPlayed = {
  items: [
    {
      track: {
        album: {
          album_type: string;
          artists: [
            {
              external_urls: {
                spotify: string;
              };
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
            },
          ];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: [
            {
              height: number;
              url: string;
              width: number;
            },
            {
              height: number;
              url: string;
              width: number;
            },
            {
              height: number;
              url: string;
              width: number;
            },
          ];
          name: string;
          release_date: string;
          release_date_precision: string;
          total_tracks: number;
          type: string;
          uri: string;
        };
        artists: [
          {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          },
        ];
        available_markets: [];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
          isrc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_local: boolean;
        is_playable: boolean;
        name: string;
        popularity: number;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
      };
      played_at: string;
      context: {
        external_urls: {
          spotify: string;
        };
        href: string;
        type: string;
        uri: string;
      };
    },
  ];
  next: string;
  cursors: {
    after: string;
    before: string;
  };
  limit: number;
  href: string;
};

// <a href={item.track.href} key={item.track.id}>
//   <Card className="m-1 bg-dark text-white" style={{ width: "12rem" }}>
//     <Card.Img variant="top" src={item.track.album.images[0].url} />
//     <Card.Body className="text-center">
//       <Card.Title className="h6">{item.track.artists[0].name}</Card.Title>
//     </Card.Body>
//   </Card>
// </a>;
