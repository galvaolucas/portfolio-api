import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  message: string;
}
