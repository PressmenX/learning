import { IsString, MinLength } from 'class-validator';

export class CreateBookDTO {
  @IsString({ message: 'invalid id format, The id must be a string' })
  id!: string;

  @IsString({ message: 'The book name must be a string' })
  @MinLength(3, { message: 'Book name must be at least 3 characters' })
  name!: string;

  @IsString({
    message: 'invalid authorId format, The authorId must be a string',
  })
  authorId!: string;
}
