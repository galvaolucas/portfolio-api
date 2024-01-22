import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Address } from "src/modules/address/schema/address.schema";
import { User } from "src/modules/user/schema/user.schema";
import { CreatePersonalDataDto } from "../dto/create-personal-data.dto";

export type PersonalDataDocument = HydratedDocument<PersonalData>;

@Schema()
export class PersonalData implements CreatePersonalDataDto {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: string | Address;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true })
  user: string | User;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  mainRole: string;

  @Prop({ required: true })
  secondaryRole: string[];

  @Prop()
  github?: string;

  @Prop()
  linkedin?: string;

  @Prop()
  whatsapp?: string;
}

export const PersonalDataSchema = SchemaFactory.createForClass(PersonalData);

