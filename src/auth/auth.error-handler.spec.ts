import { Test, TestingModule } from '@nestjs/testing';
import { AuthSQLiteErrorHandler } from './auth.error-handler';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthSQLiteErrorHandler', () => {
  let errorHandler: AuthSQLiteErrorHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthSQLiteErrorHandler],
    }).compile();

    errorHandler = module.get<AuthSQLiteErrorHandler>(AuthSQLiteErrorHandler);
  });

  it('should be defined', () => {
    expect(errorHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should throw an unauthorized exception when user not exist', () => {
      try {
        errorHandler.handle(new Error('User not exist'));
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should throw an unauthorized exception when password not match', () => {
      try {
        errorHandler.handle(new Error('Password not match'));
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should throw an exception', () => {
      try {
        errorHandler.handle(new Error());
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
