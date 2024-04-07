
export interface Phrase {
  id: number;
  text: string;
  date: string;
  allUsersLiked: {id: number, username: string}[];
  likes: number;
  author: string;
}
