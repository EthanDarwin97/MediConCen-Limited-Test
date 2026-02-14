import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity("user_mappings")
@Unique(["id1", "id2"])
export class UserMapping {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  id1: string;
  @Column()
  id2: string;
  @Column()
  userID: string;
}
