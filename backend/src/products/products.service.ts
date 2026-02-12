import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { ProductRepository } from './repositories/product.repository';

export interface ProductWithPopularity extends Product {
  timesOrdered: number;
}

@Injectable()
export class ProductsService {
  constructor(
    private productRepository: ProductRepository,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async findAll(search?: string, category?: string): Promise<ProductWithPopularity[]> {
    const products = await this.productRepository.searchWithFilters(search, category);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const productIds = products.map(p => p.id);

    const orderCounts = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .select('orderItem.product_id', 'productId')
      .addSelect('COUNT(*)', 'count')
      .where('orderItem.product_id IN (:...productIds)', { productIds })
      .andWhere('orderItem.created_at >= :oneWeekAgo', { oneWeekAgo })
      .groupBy('orderItem.product_id')
      .getRawMany();

    const orderCountMap = new Map<number, number>();
    orderCounts.forEach((row) => {
      orderCountMap.set(row.productId, parseInt(row.count, 10));
    });

    const productsWithPopularity: ProductWithPopularity[] = products.map(product => ({
      ...product,
      timesOrdered: orderCountMap.get(product.id) || 0,
    }));

    return productsWithPopularity;
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findById(id);
  }

  async getCategories(): Promise<string[]> {
    return this.productRepository.getCategories();
  }
}
