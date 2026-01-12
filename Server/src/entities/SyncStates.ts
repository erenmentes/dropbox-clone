import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Devices } from "./Devices";

@Index("sync_states_pk", ["id"], { unique: true })
@Entity("sync_states", { schema: "public" })
export class SyncStates {
  @Column("character varying", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "last_sync_at", nullable: true })
  lastSyncAt: string | null;

  @Column("timestamp without time zone", {
    name: "last_known_version_snapshot",
    nullable: true,
  })
  lastKnownVersionSnapshot: Date | null;

  @ManyToOne(() => Devices, (devices) => devices.syncStates)
  @JoinColumn([{ name: "device_id", referencedColumnName: "id" }])
  device: Devices;
}
