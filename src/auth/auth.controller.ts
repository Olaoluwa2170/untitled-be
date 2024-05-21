import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignUpDto } from './dto';
import { Public } from './decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  signup(
    @Body() dto: AuthSignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = this.authService.signup(dto);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 10000,
      secure: true,
      sameSite: 'none',
    });

    return accessToken;
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
