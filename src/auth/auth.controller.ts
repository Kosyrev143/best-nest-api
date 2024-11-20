import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { LoginDto } from './dtos/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Sign in on account' })
  @ApiCreatedResponse({
    description: 'Success login',
    type: LoginDto,
  })
  @ApiUnauthorizedResponse({ description: 'User not authorized' })
  login(@Body() input: LoginDto) {
    return this.authService.authenticate(input);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Fetch me' })
  @ApiOkResponse({
    description: 'My data fetched successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Me not found' })
  getUserInfo(@Request() request) {
    return request.user;
  }
}
