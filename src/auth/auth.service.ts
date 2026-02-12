import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { pwnedPassword } from "hibp";
import { SignUpDto } from "./dto/signup.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  private async validatePasswordSecurity(password: string) {
    const count = await pwnedPassword(password);
    if (count > 0) {
      throw new UnprocessableEntityException(
        "Password is too common or has appeared in breaches. Please choose a different one.",
      );
    }
  }

  async signup(dto: SignUpDto) {
    const email = dto.email.trim();

    const existing = await this.userService.findByEmail(email);
    if (existing) {
      throw new ConflictException("Email already in use");
    }

    await this.validatePasswordSecurity(dto.password);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);
    const user = await this.userService.createUser(dto.name, email, hash);

    return { id: user.id, email: user.email, name: user.name };
  }
}
