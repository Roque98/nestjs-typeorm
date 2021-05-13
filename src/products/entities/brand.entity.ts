import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50})
  name: string;

  @Column({ type: 'varchar', length: 255})
  image: string; 

  @CreateDateColumn({
    type:"timestamptz",
    default: () => 'CURRENT_TIMESTAMP'
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: ()=> 'CURRENT_TIMESTAMP'
  })
  updateAt: Date;

  @OneToMany(() => Product, (product)=> product.brand)
  products: Product[]
}
