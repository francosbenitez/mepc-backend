declare namespace Express {
  export interface Request {
    user?: {
      id: any;
    };
  }
  export interface Response {
    user: any;
  }
}
