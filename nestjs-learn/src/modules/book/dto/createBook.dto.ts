import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBookDTO {
  @ApiProperty({ example: 'b-1' })
  @IsString({ message: 'invalid id format, The id must be a string' })
  @IsNotEmpty()
  id!: string;

  @ApiProperty({ example: 'The Home', minLength: 3 })
  @IsString({ message: 'The book name must be a string' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Book name must be at least 3 characters' })
  name!: string;

  @ApiProperty({ example: 'a-2' })
  @IsString({
    message: 'invalid authorId format, The authorId must be a string',
  })
  @IsNotEmpty()
  authorId!: string;
}
