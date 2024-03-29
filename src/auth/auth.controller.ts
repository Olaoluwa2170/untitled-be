import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignUpDto } from './dto';

@Controller('auth')
export class AuthController {



  constructor(private authService: AuthService) {}

  @Post("/signup")
  signup(@Body() dto: AuthSignUpDto) {
    return this.authService.signup(dto)
  }
  @Post("/login")
  login(@Body() dto: AuthLoginDto) {
    return this.authService.logout()
  }
  @Post("/logout")
  logout() {
    return this.authService.logout()
  }

}
