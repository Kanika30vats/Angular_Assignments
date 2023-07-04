import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { CartItem } from '../model/cartItem';
import { Product } from '../model/product';
import { DataTransferService } from './data-transfer.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = new Cart();

  constructor(private dataFromService: DataTransferService) { }

  addToCart(prod:Product): void{
    let cartItem = this.cart.items.find(
      item => item.products.id === prod.id
    )

    if(cartItem)
    {
      this.changeQuantity(prod.id, cartItem.quantity+1);
      return;
    }
    // this.cart.items.push(new CartItem(prod));
    this.cart.items.push(new CartItem(prod, this.dataFromService.data));
    // this.cart.items.push(this.dataFromService.data);
    console.warn("Cart item", this.cart.items);
  }

  removeFromCart(prodId:number): void{
    this.cart.items = this.cart.items.filter(
      item => item.products.id != prodId
    )
  }

  removeAll()
  {
    this.cart.items = [];
  }

  changeQuantity(quantity:number, prodId:number)
  {
    let cartItem = this.cart.items.find(
      item => item.products.id === prodId
    )
    if(!cartItem)
      return;

    cartItem.quantity = quantity;
  }

  getCart(): Cart
  {
    return this.cart;
  }
}
