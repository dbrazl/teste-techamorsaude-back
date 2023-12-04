import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hash, compare } from 'bcryptjs';

enum Active {
  TRUE = 1,
  FALSE = 0,
}

enum Local {
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

  @Column()
  cnpj: string;

  @Column()
  local: number;

  @Column({ type: 'datetime' })
  opening_date: string;

  @Column()
  active: number;

  password: string;

  @Column()
  hash_password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
  }

  async checkPassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password);
  }

  getUserSpecialties(): any[] {
    return [];
  }
}
