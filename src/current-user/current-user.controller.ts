import {
  Controller, Get, Patch, UseGuards, Req, Body, HttpCode, HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from '../auth/dto/auth.dto';
import { hashSync } from 'bcrypt';

const SALT_ROUNDS = 10;

@ApiTags('Current User')
@ApiBearerAuth()
@Controller('current_user')
export class CurrentUserController {
  constructor(private readonly usersService: UsersService) { }

  /*
   * TODO: Return current user
   */

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  show(@Req() req: any) {
    return this.usersService.findOne(req.user.id)
    // return 'Add your implementation here.';
  }

  /*
   * TODO: Update current user
   */

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Req() req: any, @Body() updateUserDto: AuthDto) {
    const user = await this.usersService.findOne(req.user.id)

    return this.usersService.update(user, { username: updateUserDto.username, encryptedPassword: hashSync(updateUserDto.password, SALT_ROUNDS) })
    // return 'Add your implementation here.';
  }
}
