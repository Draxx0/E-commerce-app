export interface IToken {
  username: string;
  exp: number;
  iat: number;
  email: string;
  _id: string;
}

export interface UserToken {
  username: string;
  exp: number;
  iat: number;
  role: string;
  sub: string;
}
