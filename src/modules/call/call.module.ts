import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';
import { CallService } from './call.service';

@Module({
  imports: [TypeOrmModule.forFeature([Call])],
  providers: [CallService],
})

export class CallModule {}