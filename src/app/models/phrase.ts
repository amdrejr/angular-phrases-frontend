import { User } from "./user";

export interface Phrase {
  id: number;
  text: string;
  author: User;
  date: string;
  likes: number;
}
