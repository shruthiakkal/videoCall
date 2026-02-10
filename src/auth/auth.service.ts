import { Injectable } from '@nestjs/common';
import { pwnedPassword } from 'hibp';

@Injectable()
export class AuthService {
  private async assertPassword(password: string) {
    const count = await pwnedPassword(password);
    if (count > 0) {
      return {
        status: 'FAIL',
        message:
          'Password is too common or has appeared in breaches. Choose a different one.',
        data: {},
      };
    }
    return {
      status: 'SUCCESS',
      message: 'Strong password',
      data: {},
    };
  }
}
