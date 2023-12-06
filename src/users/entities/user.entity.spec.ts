import { User } from './user.entity';
import * as bcryptjs from 'bcryptjs';

const opening_date = new Date();

const user: User = new User({
  company_name: 'Company name',
  fantasy_name: 'Fantasy name',
  cnpj: '12345678912345',
  local: 1,
  active: 1,
  opening_date,
  password: '123456',
});

describe('UsersService', () => {
  describe('hashPassword', () => {
    it('should create a hash password', async () => {
      await user.hashPassword();
      expect(user.hash_password).toBeTruthy();
    });

    it('should throw a exception', () => {
      jest.spyOn(bcryptjs, 'hash').mockRejectedValueOnce(new Error());
      expect(user.hashPassword()).rejects.toThrow();
    });
  });

  describe('checkPassword', () => {
    it('should check password and return true', async () => {
      const isCorrect = await user.checkPassword('123456');
      expect(isCorrect).toBe(true);
    });

    it('should check password and return false', async () => {
      const isCorrect = await user.checkPassword('1234567');
      expect(isCorrect).toBe(false);
    });

    it('should throw a exception', () => {
      jest.spyOn(bcryptjs, 'compare').mockRejectedValueOnce(new Error());
      expect(user.checkPassword('123456')).rejects.toThrow();
    });
  });
});
