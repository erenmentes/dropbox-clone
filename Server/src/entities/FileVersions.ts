import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Files } from "./Files";

@Index("file_versions_pk", ["id"], { unique: true })
@Entity("file_versions", { schema: "public" })
export class FileVersions {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "version_number", nullable: true })
  versionNumber: string | null;

  @Column("character varying", { name: "size", nullable: true })
  size: string | null;

  @Column("character varying", { name: "hash", nullable: true })
  hash: string | null;

  @Column("character varying", { name: "s3_key", nullable: true })
  s3Key: string | null;

  @Column("character varying", { name: "created_at", nullable: true })
  createdAt: string | null;

  @ManyToOne(() => Files, (files) => files.fileVersions)
  @JoinColumn([{ name: "file_id", referencedColumnName: "id" }])
  file: Files;
}
