import { Request, Response } from 'express';
import { User } from '../entity/User';
import { TemporaryUser } from './TemporaryUser';

export interface MyContext {
  req: Request | any;
  res: Response;
  user: User;
  tempUser: TemporaryUser;
  roomId: string | number;
}
