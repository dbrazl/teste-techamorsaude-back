import { Test, TestingModule } from '@nestjs/testing';
import { UsersSQLiteErrorHandler } from './users.error-handler';
import { UnauthorizedException } from '@nestjs/common';

describe('UsersSQLiteErrorHandler', () => {
  let errorHandler: UsersSQLiteErrorHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersSQLiteErrorHandler],
    }).compile();

    errorHandler = module.get<UsersSQLiteErrorHandler>(UsersSQLiteErrorHandler);
  });

  it('should be defined', () => {
    expect(errorHandler).toBeDefined();
  });

  describe('handle', () => {
    it('should called unique', () => {
      const unique = jest.spyOn(errorHandler, 'unique');

      try {
        errorHandler.handle(new Error());
      } catch (error) {
        expect(unique).toHaveBeenCalledWith(error);
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

  describe('unique', () => {
    it('should throw an unique exception', () => {
      try {
        errorHandler.unique(new Error('UNIQUE constraint'));
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should do nothing', () => {
      expect(errorHandler.unique(new Error(''))).toBeUndefined();
    });
  });
});
