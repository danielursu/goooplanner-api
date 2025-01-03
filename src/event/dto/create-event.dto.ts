import { IsDateString, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsIn(['holiday', 'out-of-office', 'meeting', 'other'])
  type: string;
}