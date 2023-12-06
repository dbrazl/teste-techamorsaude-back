import { Injectable, UnauthorizedException } from '@nestjs/common';

export interface IUsersErrorHandler {
  handle(error: Error): void;
}

@Injectable()
export class UsersSQLiteErrorHandler implements IUsersErrorHandler {
  handle(error: Error): void {
    this.unique(error);
    throw error;
  }

  unique(error: Error): void {
    if (error.message.includes('UNIQUE constraint')) {
      throw new UnauthorizedException(error.message, {
        cause: error,
        description: 'Some fields has unique constrain',
      });
    }
  }
}
