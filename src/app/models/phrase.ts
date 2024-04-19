export interface Phrase {
  id: number;
  text: string;
  date: string;
  likes: number;
  // likedByUsers: {id: number, username: string}[];
  isLikedByMe: boolean,
  author: {id: number, username: string};
}
