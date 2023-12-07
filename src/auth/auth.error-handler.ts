import { Injectable, UnauthorizedException } from '@nestjs/common';

export interface IAuthErrorHandler {
  handle(error: Error): void;
}

@Injectable()
export class AuthSQLiteErrorHandler implements IAuthErrorHandler {
  handle(error: Error): void {
    switch (error.message) {
      case 'User not exist':
        throw new UnauthorizedException(error.message, {
          cause: error,
          description: 'We could not found the user',
        });

      case 'Password not match':
        throw new UnauthorizedException(error.message, {
          cause: error,
          description: 'Wrong password',
        });

      default:
        throw error;
    }
  }
}
