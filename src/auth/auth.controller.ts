import 'dotenv/config';

import {
  Res,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign_in')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() _authDto: AuthDto, @CurrentUser() user, @Res({ passthrough: true }) response: Response) {
    const access_token = await this.authService.getJwtToken(user);
    response.cookie('access_token', access_token, { httpOnly: true, sameSite: 'lax', secure: false })
    return user;
  }

  @Post('sign_up')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }
}
