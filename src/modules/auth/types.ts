import { Types } from "mongoose";

export interface IAuthUser {
  id: Types.ObjectId;
  email: string;
  username: string;
  token: string;
}