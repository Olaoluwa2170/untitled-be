import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Request } from 'express';
import { Prisma } from '@prisma/client';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Req() req: Request, @Body() createEventDto: Prisma.EventCreateInput) {
    const userId = req.user['id'];
    return this.eventsService.create(createEventDto, userId);
  }

  @Get()
  searchEvents(@Query('q') query: string) {
    // return this.eventsService.searchEvents(query);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateEventDto: Prisma.EventUpdateInput,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.eventsService.remove(id);
  }
}
