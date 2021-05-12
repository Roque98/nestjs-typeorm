import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50})
  name: string;

  @Column({ type: 'varchar', length: 255})
  image: string; 
}
