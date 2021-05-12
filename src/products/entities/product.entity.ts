import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true})
  name: string;

  @Column({ type: 'text'})
  description: string;

  @Column({ type: 'float'})
  price: number;

  @Column({ type: 'int'})
  stock: number;

  @Column({ type: 'varchar'})
  image: string;
}
