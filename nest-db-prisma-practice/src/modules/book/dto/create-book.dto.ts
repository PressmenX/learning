import {
  IsString,
  IsInt,
  Min,
  Max,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  title!: string;

  @IsString()
  author!: string;

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publishedYear!: number;

  @IsString()
  publisherId!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];
}
