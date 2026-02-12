import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({
    type: "varchar",
    length: 255,
    name: "password_hash",
    select: false, // prevents fetch from db
  })
  @Exclude() // prevents sending in json response - this can affect login check, you have to explicityly allow this password hash only for login checks
  passwordHash!: string;

  @Column({ name: "password_updated_at", type: "timestamptz", nullable: true })
  passwordUpdatedAt!: Date | null;

  // you update this on successful login
  // But during sign up this user can have login as null coz they havent logged in it, so you need nullable
  @Column({ name: "last_login_at", type: "timestamptz", nullable: true })
  lastLoginAt!: Date | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;
}
