import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { FileShares } from "./FileShares";
import { FileVersions } from "./FileVersions";
import { Users } from "./Users";

@Index("files_pk", ["id"], { unique: true })
@Entity("files", { schema: "public" })
export class Files {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "path", nullable: true })
  path: string | null;

  @Column("character varying", { name: "is_deleted", nullable: true })
  isDeleted: string | null;

  @Column("character varying", { name: "current_version", nullable: true })
  currentVersion: string | null;

  @Column("character varying", { name: "created_at", nullable: true })
  createdAt: string | null;

  @Column("character varying", { name: "updated_at", nullable: true })
  updatedAt: string | null;

  @OneToMany(() => FileShares, (fileShares) => fileShares.file)
  fileShares: FileShares[];

  @OneToMany(() => FileVersions, (fileVersions) => fileVersions.file)
  fileVersions: FileVersions[];

  @ManyToOne(() => Users, (users) => users.files)
  @JoinColumn([{ name: "owner_id", referencedColumnName: "id" }])
  owner: Users;
}
