import { ApiProperty } from '@nestjs/swagger';

export class ContactResponseDto {
  @ApiProperty({ example: 'c-1' })
  id!: string;

  @ApiProperty({ example: 'John Doe', minLength: 3 })
  name!: string;

  @ApiProperty({ example: '+6281234567890' })
  phoneNumber!: string;

  @ApiProperty({ example: 'personal' })
  label!: string;
}
