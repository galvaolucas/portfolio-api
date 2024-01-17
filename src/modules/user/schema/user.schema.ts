import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRole } from 'src/global/types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements CreateUserDto {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  role: IUserRole;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
