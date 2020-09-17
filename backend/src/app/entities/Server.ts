import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('servers')
class Server {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  port: number;

  @Column()
  directory: string;

  @Column()
  autostart: boolean;

  @Column()
  crashrestart: boolean;

  @Column()
  maxplayers: number;

  @Column()
  memory: number;

  @Column()
  file: string;

  @Column()
  lastpid: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Server;
