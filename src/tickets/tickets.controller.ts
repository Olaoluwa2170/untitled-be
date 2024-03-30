import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {

    constructor(private ticketsService: TicketsService) {}

    @Get("")
    @UseGuards(AuthGuard("jwt"))
    getTicket(@Req() req: Request){
        return req.user
    }
    
    @Get("meow")
    meow(@Res() res: Response){
        this.ticketsService.createTicket("Benjamin", "token shit", "./src/tickets/imageFile/image.png")
        return res.download("./src/tickets/imageFile/image.png")
    }

}
