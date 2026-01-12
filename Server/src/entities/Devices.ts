import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Users } from "./Users";
import { SyncStates } from "./SyncStates";

@Entity("devices", { schema: "public" })
export class Devices {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar", name: "device_name", nullable: true })
  deviceName: string | null;

  @Column({ type: "timestamp", name: "last_seen_at", nullable: true })
  lastSeenAt: Date | null;

  @Column({ type: "timestamp", name: "created_at", nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => Users, user => user.devices, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: Users;

  @OneToMany(() => SyncStates, ss => ss.device)
  syncStates: SyncStates[];
}
