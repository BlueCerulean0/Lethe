export interface AnimeResponse {
  data: Data;
}

interface Data {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: never[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Producer[];
  licensors: Licensor[];
  studios: Studio[];
  genres: Genre[];
  explicit_genres: any;
  themes: Theme[];
  demographics: any;
}

interface Images {
  jpg: Jpg;
  webp: Webp;
}

interface Jpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Webp {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: Images2;
}

interface Images2 {
  image_url: string;
  small_image_url: string;
  medium_image_url: string;
  large_image_url: string;
  maximum_image_url: string;
}

interface Title {
  type: string;
  title: string;
}

interface Aired {
  from: string;
  to: string;
  prop: Prop;
  string: string;
}

interface Prop {
  from: From;
  to: To;
}

interface From {
  day: number;
  month: number;
  year: number;
}

interface To {
  day: number;
  month: number;
  year: number;
}

interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Licensor {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Theme {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
