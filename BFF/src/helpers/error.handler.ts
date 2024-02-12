import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error?.response?.data?.message) {
    res.status(error.response.status).json(error.response.data);
  } else if (error?.response?.data) {
    res.status(error.response.status).json(error.response.data);
  }

  if (error?.type == ErrorTypes.authSignInError) {
    res.status(401).json({ message: 'Invalid Credentials Provided' });
  } else if (error?.type == ErrorTypes.authSignUpError) {
    res.status(500).json({ message: 'Registration Process Failed' });
  } else {
    res.status(500).json('Something went Wrong');
  }
};

export enum ErrorTypes {
  authSignInError,
  authSignUpError,
}
