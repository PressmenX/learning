import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateMemberDto {
  @IsEmail()
  email!: string;

  @IsString()
  fullName!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  borrowedBookIds?: string[];
}
