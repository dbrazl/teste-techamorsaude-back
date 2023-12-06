import { User } from 'src/users/entities/user.entity';

export class AuthenticatedUserDto {
  user: User;
  token: string;
}
