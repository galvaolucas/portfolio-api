import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { User } from 'src/modules/user/schema/user.schema';

export class CreateProjectDto {
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  _id?: string;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  link: string;

  @ApiProperty()
  images?: string[];

  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  user: string | User;
}
