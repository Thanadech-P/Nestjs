import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Money } from '../../utils/money';
import { Category } from "./category.entity"

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  @Exclude()
  priceSubunit: number;

  @Column()
  @Exclude()
  priceCurrency: string;

  @Expose()
  price() {
    return new Money(this.priceSubunit, this.priceCurrency);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Category, category => category.products, {
    cascade: true
  })
  @JoinTable()
  categories: Category[]

  addCategories(category: Category) {
    if (this.categories === null) {
      this.categories = new Array<Category>();
    }
    this.categories.push(category)
  }
}
