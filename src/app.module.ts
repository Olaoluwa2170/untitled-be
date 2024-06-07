import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TicketsModule } from './tickets/tickets.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards/at.guard';
import { EventsModule } from './events/events.module';

@Module({
  imports: [AuthModule, PrismaModule, TicketsModule, EventsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AppService,
  ],
})
export class AppModule {}

// import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { PrismaModule } from './prisma/prisma.module';
// import { TicketsModule } from './tickets/tickets.module';
// import { APP_GUARD } from '@nestjs/core';
// import { AtGuard } from './auth/guards/at.guard';
// import { EventsModule } from './events/events.module';
// import { CorsMiddleware } from './cors-middleware/cors-middleware.middleware';

// @Module({
//   imports: [AuthModule, PrismaModule, TicketsModule, EventsModule],
//   controllers: [AppController],
//   providers: [
//     {
//       provide: APP_GUARD,
//       useClass: AtGuard,
//     },
//     AppService,
//   ],
// })
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CorsMiddleware).forRoutes('*'); // Apply the middleware to all routes
//   }
// }
