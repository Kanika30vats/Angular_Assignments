import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { CartItem } from 'src/app/model/cartItem';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { DeleteAll, DeleteProduct, GetCartProduct } from 'src/app/store/actions/cart.action';
import { CartState } from 'src/app/store/state/cart.state';
import { PdpState } from 'src/app/store/state/pdp.state';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: any;
  qtyFromPdpPage: any;
  optionVal: any;
  

  @Select(CartState.getCartList) productCart$!: Observable<Product[]>;


  constructor(private store: Store, private cartService: CartService, private dataTranferService: DataTransferService) {
    // this.setCart();
    
  }

  ngOnInit(): void {
    this.qtyFromPdpPage = this.dataTranferService.data;
    this.optionVal = this.qtyFromPdpPage;
    this.getCartData();
    
  }

  getCartData() {
    this.productCart$.subscribe((res:any) => {
      // this.store.dispatch(new GetCartProduct());
      
      

      this.cart=res[0];
      
    })

  }

  setCart() {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(cartItem: CartItem) {
    this.store.dispatch(new DeleteProduct(cartItem.products.id));
    // this.cartService.removeFromCart(cartItem.products.id);
    // this.setCart();
  }

  changeQuantity(cartItem: CartItem, quantityString: string) {
    let quantity;
    // if(this.dataTranferService.data!=1){
    //   quantity = parseInt(this.dataTranferService.data);
    //   console.warn("if val", quantity);
    // }
    // else{

    //   console.warn("else val", quantity);
    // }

    quantity = parseInt(quantityString);

    this.cartService.changeQuantity(quantity, cartItem.products.id);
    console.warn("Prod id cart", cartItem.products.id);
    this.setCart();
    cartItem.price = cartItem.getPrice();
    // for (let i = 0; i < this.cart.items.length; i++) {
    //   this.cart.items[i].products.price = cartItem.price;
    // }


  }

  deleteAll() {
    // console.warn("delete working");
    // this.cartService.removeAll();
    this.store.dispatch(new DeleteAll);
  }
}
