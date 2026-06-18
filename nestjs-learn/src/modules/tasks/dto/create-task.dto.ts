import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
export class CreateTaskDTO {
  @ApiProperty({ example: 'Fix login bug', minLength: 3 })
  @IsString({ message: 'The title must be a string' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  title!: string;

  @ApiPropertyOptional({ example: 'Users cannot log in using Google Auth' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString({ message: 'The description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.MEDIUM,
  })
  @IsEnum(TaskPriority, {
    message: 'Priority must be either low, medium, or high',
  })
  @IsNotEmpty()
  priority!: TaskPriority;
}
