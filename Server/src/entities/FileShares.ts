import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Files } from "./Files";
import { Users } from "./Users";

@Index("file_shares_pk", ["id"], { unique: true })
@Entity("file_shares", { schema: "public" })
export class FileShares {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "permission", nullable: true })
  permission: string | null;

  @Column("character varying", { name: "created_at", nullable: true })
  createdAt: string | null;

  @ManyToOne(() => Files, (files) => files.fileShares)
  @JoinColumn([{ name: "file_id", referencedColumnName: "id" }])
  file: Files;

  @ManyToOne(() => Users, (users) => users.fileShares)
  @JoinColumn([{ name: "owner_id", referencedColumnName: "id" }])
  owner: Users;

  @ManyToOne(() => Users, (users) => users.sharedWithUser)
  @JoinColumn([{ name: "shared_with_user_id", referencedColumnName: "id" }])
  sharedWithUser: Users;
}
