import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../user/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createEvent(user: User, createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create({
      ...createEventDto,
      user,
    });
    return this.eventRepository.save(event);
  }

  async getUserEvents(userId: number): Promise<Event[]> {
    return this.eventRepository.find({
      where: { user: { id: userId } },
      order: { startDate: 'ASC' },
    });
  }

  async updateEvent(
    eventId: number,
    userId: number,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId, user: { id: userId } },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    Object.assign(event, updateEventDto);
    return this.eventRepository.save(event);
  }

  async deleteEvent(eventId: number, userId: number): Promise<void> {
    const result = await this.eventRepository.delete({
      id: eventId,
      user: { id: userId },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Event not found');
    }
  }
}