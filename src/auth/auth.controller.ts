import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    dto.email;
  }
}
