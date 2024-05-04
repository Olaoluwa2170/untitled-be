import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignUpDto } from './dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  signup(@Body() dto: AuthSignUpDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('/login')
  login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }
  @Post('/logout')
  logout() {
    return this.authService.logout();
  }
}
