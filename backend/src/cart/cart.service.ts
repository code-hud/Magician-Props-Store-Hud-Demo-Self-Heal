import { Injectable } from '@nestjs/common';
import { CartItem } from './entities/cart-item.entity';
import { CartRepository } from './repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async getCart(sessionId: string): Promise<CartItem[]> {
    return this.cartRepository.findBySessionId(sessionId);
  }

  async addToCart(
    sessionId: string,
    productId: number,
    quantity: number = 1,
  ): Promise<CartItem> {
    return this.cartRepository.addItem(sessionId, productId, quantity);
  }

  async removeFromCart(sessionId: string, productId: number): Promise<void> {
    await this.cartRepository.removeItem(sessionId, productId);
  }

  async updateQuantity(
    sessionId: string,
    productId: number,
    quantity: number,
  ): Promise<CartItem> {
    return this.cartRepository.updateQuantity(sessionId, productId, quantity);
  }

  async clearCart(sessionId: string): Promise<void> {
    await this.cartRepository.clearCart(sessionId);
  }

  async getCartTotal(sessionId: string): Promise<number> {
    const cartItems = await this.cartRepository.findBySessionId(sessionId);

    return cartItems.reduce(
      (total, item) => total + Number(item.product.price) * item.quantity,
      0,
    );
  }
}
