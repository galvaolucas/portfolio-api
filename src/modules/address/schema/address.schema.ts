import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CreateAddressDto } from "../dto/create-address.dto";
import { HydratedDocument } from "mongoose";

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address implements CreateAddressDto {
  @Prop({ required: true })
  cep: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  neighborhood: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop()
  number?: string;

  @Prop()
  addOn?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);