interface ResponseItemImage {
  '#text': string;
  size: string;
}

export type ResponseImage = ResponseItemImage[];

interface ResponseItemArtist {
  name: string;
  mbid: string;
  url: string;
}

interface ResponseItemRank {
  rank: string;
}

interface ResponseItemAttrbute {
  tag: string;
  page: string;
  perPage: string;
  totalpages: string;
  total: string;
}

export interface ResponseAlbumItem {
  name: string;
  mbid: string;
  url: string;
  artist: ResponseItemArtist;
  image: ResponseImage;
  attr: ResponseItemRank;
}

export type ResponseAlbum = ResponseAlbumItem[];

export interface Response {
  albums: {
    album: ResponseAlbum;
    attr: ResponseItemAttrbute;
  };
}
