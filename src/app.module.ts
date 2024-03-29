import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [AuthModule, PrismaModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
