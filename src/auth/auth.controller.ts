import { Body, Controller, Post } from "@nestjs/common";
import { SignUpDto } from "./dto/signup.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }
}
