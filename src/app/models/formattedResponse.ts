export interface FormattedResponseItem {
  name: string;
  artist: string;
  image: string;
}

export interface Liked {
  isLiked: boolean;
}

export type FormattedResponse = (FormattedResponseItem & Liked)[];
