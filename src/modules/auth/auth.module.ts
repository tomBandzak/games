import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule],
  providers: [
    AuthService,
    HttpStrategy,
    UserService,
  ],
})
export class AuthModule{}