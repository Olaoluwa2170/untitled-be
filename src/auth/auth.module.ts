import { Get, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      // secret: "my-ticket-secret",
      // signOptions: {
      //   expiresIn: '1h'
      // }
    })
  ],  
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}