// Add 'user' property to Express Request
declare namespace Express {
  export interface Request {
    user?: {
      id: string;
    };
  }
}

export {};
