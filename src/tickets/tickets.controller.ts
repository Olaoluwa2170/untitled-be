import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
export class TicketsController {


    @Get("")
    @UseGuards(AuthGuard("jwt"))
    getTicket(){
        return [1, 2, 3, 4, 5]
    }
}
