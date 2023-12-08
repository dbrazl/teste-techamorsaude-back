import { User } from 'src/users/entities/user.entity';

interface IAuthenticatedUserDto {
  user: User;
  token: string;
}

export class AuthenticatedUserDto {
  user: User;
  token: string;

  constructor(props: IAuthenticatedUserDto) {
    Object.assign(this, props);
  }
}
