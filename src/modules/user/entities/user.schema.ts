import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements CreateUserDto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ required: true })
  message: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
