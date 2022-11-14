import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class PlanetaryData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  date: string;

  @Column("longtext")
  explanation: string;

  @Column()
  media_type: string;

  @Column()
  service_version: string;

  @Column({
    unique: true,
  })
  title: string;

  @Column({
    unique: true,
  })
  url: string;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
