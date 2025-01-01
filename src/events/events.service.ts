import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { EventFilterDto } from './dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: Prisma.EventCreateInput, hostId: string) {
    const { role, email } = await this.prisma.user.findUnique({
      where: {
        id: hostId
      }
    })

    if(!email) throw new HttpException("User does not exist", HttpStatus.FORBIDDEN)
    if(role !== "HOST") throw new HttpException("User is not allowed to create an event", HttpStatus.FORBIDDEN)
      
    try {
      const { eventName } = createEventDto;
      const event = await this.prisma.event.findUnique({
        where: {
          eventName,
        },
      });

      if (event)
        return new HttpException(
          'An event with this name already exists',
          HttpStatus.CONFLICT,
        );
      const newEvent = await this.prisma.event.create({
        data: {
          ...createEventDto,
          host: {
            connect: {
              id: hostId
            }
          },
        },
      });
      return newEvent;
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

  async findAll(query: EventFilterDto) {
    const { date, name, type, page, size, status } = query
    const take = (size && page) ? Number(size) : undefined
    const skip = (size && page) ? Number(page - 1) * take : undefined

    const whereClause = {
      AND: [],
    }

    if(name){
      whereClause.AND.push({
        eventName: {
          contains: name,
          mode: "insensitive"
        }
      })
    }

    if(type){
      whereClause.AND.push({
        type
      })
    }

    if(date){
      whereClause.AND.push({
        date: {
          has: date ?? null
        }
      })
    }

    if(status){
      whereClause.AND.push({
        status
      })
    }

    

    const events = await this.prisma.event.findMany({
      where: whereClause,
      take,
      skip,
      include: {
        tickets: true,
        host: true
      }
    });
    return events;
  }

  async updateTickets(id: string, number: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new HttpException('Event does not exist', HttpStatus.NOT_FOUND);
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: {
        noTickets: event.noTickets - number,
      },
    });

    return updatedEvent;
  }


  async findAllByCreator(id: string, query: EventFilterDto) {

    if(id.length !== 24) throw new HttpException("User does not exist", HttpStatus.UNAUTHORIZED)
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    if(!user) throw new HttpException("User does not exist", HttpStatus.UNAUTHORIZED)
    
    const { date, name, type, page, size } = query
    const take = (size && page) ? Number(size) : undefined
    const skip = (size && page) ? Number(page - 1) * take : undefined
    
    const whereClause = {
      AND: [],
    }

    if(name){
      whereClause.AND.push({
        eventName: {
          contains: name,
          mode: "insensitive"
        }
      })
    }

    if(type){
      whereClause.AND.push({
        type
      })
    }

    if(date){
      whereClause.AND.push({
        date: {
          has: date ?? null
        }
      })
    }

    const events = await this.prisma.event.findMany({
      where: {
        ...whereClause,
        hostId: id
      },
      take,
      skip,
      include: {
        tickets: true,
        host: true
      }
    });
    return events;
  }

  async findOne(id: string) {
    if(id.length !== 24) throw new HttpException("Event does not exist", HttpStatus.NOT_FOUND)
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        host: true,
      },
    });
    return event;
  }

  async update(id: string, updateEventDto: Prisma.EventUpdateInput) {
    if(id.length !== 24) throw new HttpException("Event does not exist", HttpStatus.NOT_FOUND)
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
      
      return { success: true, message: "Event Updated Successfully" }
    }
    
    async remove(id: string) {
      if(id.length !== 24) throw new HttpException("Event does not exist", HttpStatus.NOT_FOUND)
      const event = await this.findOne(id);
      if (!event)
        throw new HttpException(
          'This event does not exist',
          HttpStatus.NOT_FOUND,
        );
      
      await this.prisma.event.delete({
        where: {
          id,
        },
      });
      return { success: true, message: "Event deleted Successfully" }
  }
}
