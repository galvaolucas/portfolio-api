import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/schema/user.schema';

export class CreateExperienceDto {
  @ApiProperty()
  user: User | string;

  @ApiProperty({ required: true })
  company: string;

  @ApiProperty({ required: true })
  role: string;

  @ApiProperty({ type: Date, required: true })
  startDate: string;

  @ApiProperty({ type: Date })
  endDate?: string;

  @ApiProperty()
  currentJob?: boolean;

  @ApiProperty({ required: true })
  attributions: string;

  @ApiProperty({ required: true })
  technologies: string[];
}
