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
import { EventFilterDto } from './dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Req() req: Request, @Body() createEventDto: Prisma.EventCreateInput) {
    const userId = req.user['id'];
    return this.eventsService.create(createEventDto, userId);
  }


  @Get()
  findAll(@Query() query: EventFilterDto) {
    return this.eventsService.findAll(query);
  }

  @Get('creator/:id')
  findAllByCreator(@Param('id') id: string, @Query() query: EventFilterDto) {
    return this.eventsService.findAllByCreator(id, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: Prisma.EventUpdateInput,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
