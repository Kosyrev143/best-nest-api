import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginPassportDto } from './dtos/login-passport.dto';

@ApiTags('auth-v2')
@Controller('auth-v2')
export class PassportAuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  @ApiOperation({ summary: 'Sign in on account with passport' })
  @ApiOkResponse({
    description: 'Success login',
    type: LoginPassportDto,
  })
  @ApiUnauthorizedResponse({ description: 'User not authorized' })
  login(@Request() request, @Body() loginDto: LoginPassportDto) {
    return this.authService.signIn(request.user);
  }

  @ApiBearerAuth()
  @UseGuards(PassportJwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Fetch me with passport' })
  @ApiOkResponse({
    description: 'My data fetched successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Me not found' })
  getUserInfo(@Request() request) {
    return request.user;
  }
}
