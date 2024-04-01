import { Phrase } from "./phrase";

export interface User {
  id: number;
  username: string;
  phrases: Phrase[];
}
