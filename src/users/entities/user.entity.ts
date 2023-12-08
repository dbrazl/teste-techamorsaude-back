import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { hash, compare } from 'bcryptjs';

export enum Active {
  TRUE = 1,
  FALSE = 0,
}

export enum Local {
  TRUE = 1,
  FALSE = 0,
}

interface IProps {
  company_name: string;
  fantasy_name: string;
  cnpj: string;
  local: Local;
  opening_date: Date;
  active: Active;
  password: string;
}

@Entity()
export class User {
  constructor(props: IProps) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column()
  fantasy_name: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  local: number;

  @Column({ type: 'datetime' })
  opening_date: Date;

  @Column()
  active: number;

  password: string;

  @Column()
  hash_password: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.hash_password = await hash(this.password, 12);
  }

  async checkPassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.hash_password);
  }
}
