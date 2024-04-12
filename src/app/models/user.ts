
export interface User {
  id: number;
  username: string;
  allFollowers: {
    id: number;
    username: string;
  }[];
  allFollowing: {
    id: number;
    username: string;
  }[];
}
