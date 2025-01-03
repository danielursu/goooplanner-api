import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { EventResponseDto } from './dto/event-response.dto';
import { Request } from 'express';
import { User } from '../user/user.entity';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createEventDto: CreateEventDto,
  ): Promise<EventResponseDto> {
    const user = req.user as User;
    const event = await this.eventService.createEvent(user, createEventDto);
    return new EventResponseDto(event);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<EventResponseDto[]> {
    const user = req.user as User;
    const events = await this.eventService.getUserEvents(user.id);
    return events.map((event) => new EventResponseDto(event));
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    const user = req.user as User;
    const event = await this.eventService.updateEvent(
      parseInt(id),
      user.id,
      updateEventDto,
    );
    return new EventResponseDto(event);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string): Promise<void> {
    const user = req.user as User;
    return this.eventService.deleteEvent(parseInt(id), user.id);
  }
}