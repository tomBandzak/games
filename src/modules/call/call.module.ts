import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { Call } from './entities/call.entity';
import { CallService } from './call.service';
import { CallController } from './call.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Call]),
    AuthModule,
    PassportModule,
  ],
  providers: [CallService],
  controllers: [CallController],
})

export class CallModule {}