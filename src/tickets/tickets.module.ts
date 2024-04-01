import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { AtStrategy } from '../auth/strategies/at.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PassportModule, ConfigModule, PrismaModule],
  controllers: [TicketsController],
  providers: [TicketsService, AtStrategy]
})
export class TicketsModule {}
