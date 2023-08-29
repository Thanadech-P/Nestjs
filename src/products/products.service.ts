import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { And, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { QueryProductDto } from './dto/query-product.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) { }

  findAll(query: QueryProductDto) {
    let queryPriceSubunit;
    if (query.priceSubunit) {
      if (query.priceSubunit['gte'] && query.priceSubunit['lte']) {
        queryPriceSubunit = And(MoreThanOrEqual(query.priceSubunit['gte']), LessThanOrEqual(query.priceSubunit['lte']))
      } else {
        if (query.priceSubunit['gte']) {
          queryPriceSubunit = MoreThanOrEqual(query.priceSubunit['gte'])
        }
        if (query.priceSubunit['lte']) {
          queryPriceSubunit = LessThanOrEqual(query.priceSubunit['lte'])
        }
      }
    }
    return this.productsRepository.find({
      relations: {
        categories: true,
      },
      where: {
        name: query.name,
        priceSubunit: queryPriceSubunit,

      }
    });
  }
  async findOne(id: number) {
    return this.productsRepository.findOne({
      relations: {
        categories: true
      },
      where: {
        id
      }
    });
  }

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  async update(product: Product, updateProductDto: UpdateProductDto) {
    if (updateProductDto.categories && updateProductDto.categories.length > 0) {
      updateProductDto.categories.map((cate) => {
        const category = new Category();
        category.name = cate
        product.addCategories(category)
      })
    }
    const updateProduct = { ...product, ...updateProductDto, categories: product.categories }

    return this.productsRepository.save(updateProduct);
  }

  remove(product: Product) {
    return this.productsRepository.delete(product.id);
  }
}
