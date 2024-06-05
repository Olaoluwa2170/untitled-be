import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get('')
  getUserTickets(@Req() req: Request) {
    console.log(req.user);
    const userId = parseInt(req.user['id']);
    return this.ticketsService.getUserTickets(userId);
  }

  @Post('')
  generateTicket(@Body() dto: any, @Res() res: Response) {
    this.ticketsService.createTicket(
      dto.name,
      'token shit',
      `./src/tickets/imageFile/${dto.name}-ticket.png`,
    );
    return res.download('./src/tickets/imageFile/image.png');
  }
}
