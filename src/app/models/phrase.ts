
export interface Phrase {
  id: number;
  text: string;
  date: string;
  usersLiked: {id: number, username: string}[];
  likes: number;
  author: {id: number, username: string};
}
