import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { DtoModule } from "./dto/dto.module";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [DtoModule, UsersModule],
})
export class AuthModule {}
