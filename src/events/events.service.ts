import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: Prisma.EventCreateInput, hostId: number) {
    try {
      const { eventName, date, location, type, prices, bgImage } =
        createEventDto;
      const event = await this.prisma.event.findUnique({
        where: {
          eventName,
        },
      });

      if (event)
        throw new HttpException(
          'An event with this name already exists',
          HttpStatus.CONFLICT,
        );
      const newEvent = await this.prisma.event.create({
        data: {
          bgImage,
          date,
          location,
          eventName,
          prices,
          type,
          hostId,
        },
      });
      return `Successfully added a new event ${newEvent.eventName}`;
    } catch (error) {
      console.log(
        `Internal server Error ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      throw new HttpException(
        `Internal server Error ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const events = await this.prisma.event.findMany();
    return events;
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });
    return event;
  }

  async update(id: number, updateEventDto: Prisma.EventUpdateInput) {
    const event = await this.findOne(id);

    if (!event)
      throw new HttpException(
        'This event does not exist',
        HttpStatus.NOT_FOUND,
      );

    await this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });

    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    const event = await this.prisma.event.delete({
      where: {
        id,
      },
    });
    return `This action removes a #${id} event ${event.eventName}`;
  }
}