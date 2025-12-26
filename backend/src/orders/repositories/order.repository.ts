import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrder(
    sessionId: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    totalAmount: number,
  ): Promise<Order> {
    const order = this.orderRepository.create({
      session_id: sessionId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      total_amount: totalAmount,
      status: 'completed',
    });
    const saved = await this.orderRepository.save(order);
    console.log(`[OrderRepository] Created order ${saved.id} for session ${sessionId} with total $${totalAmount}`);
    return saved;
  }

  async addOrderItem(
    orderId: number,
    productId: number,
    quantity: number,
    price: number,
  ): Promise<OrderItem> {
    const item = this.orderItemRepository.create({
      order_id: orderId,
      product_id: productId,
      quantity,
      price,
    });
    const saved = await this.orderItemRepository.save(item);
    console.log(`[OrderRepository] Added item to order ${orderId}: product ${productId}, qty ${quantity}, price $${price}`);
    return saved;
  }

  async findById(id: number): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    console.log(`[OrderRepository] ${order ? 'Found' : 'Did not find'} order ${id}`);
    return order;
  }

  async findBySessionId(sessionId: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { session_id: sessionId },
      relations: ['items', 'items.product'],
      order: { created_at: 'DESC' },
    });
    console.log(`[OrderRepository] Found ${orders.length} orders for session ${sessionId}`);
    return orders;
  }
}
