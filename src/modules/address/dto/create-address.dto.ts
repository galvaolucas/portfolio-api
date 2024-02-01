import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";

export class CreateAddressDto {
  @ApiProperty()
  _id?: ObjectId;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  number?: string;

  @ApiProperty()
  addOn?: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}
