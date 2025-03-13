import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        password: 'strongpassword',
        telephone: '+123456789',
      },
    },
  })
  @Post('register')
  async register(
    @Body() body: { email: string; password: string; telephone: string },
  ) {
    return this.authService.register(body.email, body.password, body.telephone);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({
    schema: {
      example: { email: 'user@example.com', password: 'strongpassword' },
    },
  })
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
