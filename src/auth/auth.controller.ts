import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthLoginDto, AuthSignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
  ) {}

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

  @Public()
  @Get('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookies = req.cookies;

    // if (!cookies?.accessToken) return res.sendStatus(204);
    if (!cookies?.accessToken) throw new HttpException("Not logged in", HttpStatus.UNAUTHORIZED)

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    // return res.sendStatus(204);
  }
}
