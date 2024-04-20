export interface Phrase {
  id: number;
  text: string;
  date: string;
  likes: number;
  isLikedByMe: boolean,
  author: {id: number, username: string};
}
