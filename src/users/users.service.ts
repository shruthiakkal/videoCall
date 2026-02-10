import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async createUser(name: string, email: string, passwordHash: string) {
    const user = this.userRepo.create({
      email: email.toLowerCase().trim(),
      name: name.trim(),
      passwordHash,
      passwordUpdatedAt: new Date(),
    });

    return await this.userRepo.save(user);
  }
}
