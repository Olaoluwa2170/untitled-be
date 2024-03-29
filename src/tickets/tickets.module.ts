import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { AtStrategy } from './strategies/at.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [TicketsController],
  providers: [TicketsService, AtStrategy]
})
export class TicketsModule {}
