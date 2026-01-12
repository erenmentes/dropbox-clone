import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("refresh_tokens_pk", ["id"], { unique: true })
@Entity("refresh_tokens", { schema: "public" })
export class RefreshTokens {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "token_hash", nullable: true })
  tokenHash: string | null;

  @Column("timestamp without time zone", { name: "expires_at", nullable: true })
  expiresAt: Date | null;

  @Column("character varying", { name: "revoked", nullable: true })
  revoked: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.refreshTokens)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
