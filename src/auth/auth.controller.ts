import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<AuthenticatedUserDto> {
    return await this.authService.login(loginUserDto);
  }
}
