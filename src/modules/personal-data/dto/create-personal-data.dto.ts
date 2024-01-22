import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Address } from 'src/modules/address/schema/address.schema';
import { User } from 'src/modules/user/schema/user.schema';

export class CreatePersonalDataDto {
  @ApiProperty({ required: true })
  about: string;

  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  address: string | Address;

  @ApiProperty({ type: mongoose.Schema.Types.ObjectId, uniqueItems: true })
  user: string | User;

  @ApiProperty()
  mainRole: string;

  @ApiProperty()
  secondaryRole: string[];

  @ApiProperty()
  github?: string;

  @ApiProperty()
  linkedin?: string;

  @ApiProperty()
  whatsapp?: string;
}
