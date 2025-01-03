import { ApiProperty } from '@nestjs/swagger';

export class EventResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty({ enum: ['holiday', 'out-of-office', 'meeting', 'other'] })
  type: string;

  @ApiProperty()
  userId: number;

  constructor(partial: Partial<EventResponseDto>) {
    Object.assign(this, partial);
  }
}