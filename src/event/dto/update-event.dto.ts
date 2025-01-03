import { IsDateString, IsOptional, IsString, IsIn } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsString()
  @IsOptional()
  override title?: string;

  @IsString()
  @IsOptional()
  override description?: string;

  @IsDateString()
  @IsOptional()
  override startDate?: Date;

  @IsDateString()
  @IsOptional()
  override endDate?: Date;

  @IsString()
  @IsIn(['holiday', 'out-of-office', 'meeting', 'other'])
  @IsOptional()
  override type?: string;
}