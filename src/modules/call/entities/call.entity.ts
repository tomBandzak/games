import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICall } from '../interfaces/call.interface';

@Entity()
export class Call implements ICall{
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  called_at: Date;
}