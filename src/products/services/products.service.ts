import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>
  ) {}

  async findAll() {
    const products = await this.productRepo.find({
      relations: ['brand']
    });
    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id,{
      relations: ['brand', 'categories']
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne(data.brandId);
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      newProduct.categories = categories
    }

    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne(changes.brandId);
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(changes.categoriesIds);
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  
  async removeCategoryByProduct(productId: number, categoryId: number){
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories']
    });
    product.categories = product.categories.filter((item) => {
      return item.id !== categoryId
    })
    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number){
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories']
    });
    const category = await this.categoryRepo.findOne(categoryId);
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
