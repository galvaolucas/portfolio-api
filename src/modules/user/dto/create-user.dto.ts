import { ApiProperty } from '@nestjs/swagger';
import { IUserRole } from 'src/global/types';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: IUserRole;

  @ApiProperty()
  password: string;
}
