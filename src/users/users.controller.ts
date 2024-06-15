import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AdminCreateDto } from './dto/create-admin.dto';
import { GuestCreateDto } from './dto/create-guest.dto';
import { AdminLoginDto } from './dto/login-admin.dto';
import { GuestLoginDto } from './dto/login-guest.dto';
import { RoleGuard } from './guards/rolde.guard';
import { ExpressRequest } from './middleware/auth.middleware';
import { UserResponseType } from './types/userResponse.type';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('admin')
  async createAdmin(
    @Body() adminCreateDto: AdminCreateDto,
  ): Promise<UserResponseType> {
    const user = await this.userService.createAdmin(adminCreateDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('guest')
  async createGuest(
    @Body() guestCreateDto: GuestCreateDto,
  ): Promise<UserResponseType> {
    const user = await this.userService.createGuest(guestCreateDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('admin/login')
  @UseGuards(RoleGuard)
  async loginAdmin(
    @Res({ passthrough: true }) res: Response,
    @Body() adminLoginDto: AdminLoginDto,
  ) {
    const user = await this.userService.loginAdmin(adminLoginDto);
    res.cookie('accessToken', this.userService.generateJwt(user), {
      expires: new Date(new Date().getTime() + 60 * 1000 * 60), // 1 hour auth
      sameSite: 'strict',
      httpOnly: true,
    });
    return this.userService.buildUserResponse(user);
  }

  @Post('guest/login')
  @UseGuards(RoleGuard)
  async loginGuest(
    @Res({ passthrough: true }) res: Response,
    @Body() guestLoginDto: GuestLoginDto,
  ) {
    const user = await this.userService.loginGuest(guestLoginDto);
    res.cookie('accessToken', this.userService.generateJwt(user), {
      expires: new Date(new Date().getTime() + 60 * 1000 * 60), // 1 hour auth
      sameSite: 'strict',
      httpOnly: true,
    });
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @Request() request: ExpressRequest,
  ): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.buildUserResponse(request.user);
  }
}
