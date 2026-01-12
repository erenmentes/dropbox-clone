import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Devices } from "./Devices";
import { FileShares } from "./FileShares";
import { Files } from "./Files";
import { RefreshTokens } from "./RefreshTokens";

@Index("users_unique_email", ["email"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar", name: "password_hash", nullable: true })
  passwordHash: string | null;

  @Column({ type: "timestamp", name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column({ type: "timestamp", name: "last_login_at", nullable: true })
  lastLoginAt: Date | null;

  @OneToMany(() => Devices, device => device.user)
  devices: Devices[];

  @OneToMany(() => FileShares, fs => fs.owner)
  fileShares: FileShares[];

  @OneToMany(() => FileShares, fs => fs.sharedWithUser)
  sharedWithUser: FileShares[];

  @OneToMany(() => Files, file => file.owner)
  files: Files[];

  @OneToMany(() => RefreshTokens, rt => rt.user)
  refreshTokens: RefreshTokens[];
}
