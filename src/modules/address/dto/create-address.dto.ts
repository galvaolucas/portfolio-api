import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto {
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
