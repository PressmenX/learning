import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateMemberDto {
  @IsEmail()
  email!: string;

  @IsString()
  fullName!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
