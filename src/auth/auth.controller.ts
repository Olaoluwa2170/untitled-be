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
  async signup(
    @Body() dto: AuthSignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.signup(dto);

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
  async login(
    @Body() dto: AuthLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.login(dto);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 10000,
      secure: true,
      sameSite: 'none',
    });
    return accessToken;
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }
}
