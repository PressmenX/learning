import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  label!: string;
}
