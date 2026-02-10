import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DtoModule } from './dto/dto.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [DtoModule]
})
export class AuthModule {}
