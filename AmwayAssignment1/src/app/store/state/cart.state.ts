
import produce from 'immer';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of } from "rxjs";
import { Cart } from "src/app/model/cart";
import { Product } from "src/app/model/product";
import { CartService } from "src/app/services/cart.service";
import { AddCart, DeleteAll, DeleteProduct, GetCartProduct } from "../actions/cart.action";


export class CartStateModel {
    cartProduct!: Product[];

}

@State<CartStateModel>({
    name: 'cart',
    defaults: {
        cartProduct: []

    }
})

@Injectable()
export class CartState {
    constructor(
        private cartService: CartService
    ) {

    }

    @Selector()
    static getCartList(state: CartStateModel) {
        console.log('hi', state);
        return state.cartProduct;
    }

    @Action(GetCartProduct)
    getProducts(context: StateContext<CartStateModel>) {

        // return this.cartService.getCart() 

        const products: any = [];
        products.push(this.cartService.getCart());

        const state = context.getState();

        context.setState({
            ...state,
            cartProduct: products

        });

        console.log('cart state', state);

    }

    @Action(AddCart)
    addToCart(context: StateContext<CartStateModel>, { payload }: AddCart) {

        const state = context.getState();


        this.cartService.addToCart(payload);
        const cartData = this.cartService.getCart();

        const products: any = [];
        products.push(cartData);
        console.log('tetsing cartData', cartData);
        console.log('testing products', products);

        context.setState(produce((draft: CartStateModel) => {

            draft.cartProduct = products;
            console.log('test draft', draft.cartProduct);
        }));
        console.log(context.getState());
        // context.patchState({
        //     cartProduct:[...state.cartProduct, products]
        // })
        //  console.log('testing cartProducts', state.cartProduct);


    }

    @Action(DeleteProduct)
    deleteFromCart(context: StateContext<CartStateModel>, {id}: DeleteProduct){
        this.cartService.removeFromCart(id);

        const cartData = this.cartService.getCart();
        const products: any = [];
        products.push(cartData);

        context.setState(produce((draft: CartStateModel) => {

            draft.cartProduct = products;
            
        }));
    }

    @Action(DeleteAll)
    deleteAll(context: StateContext<CartStateModel>)
    {
        this.cartService.removeAll();

        // context.setState(produce((draft: CartStateModel) => {
        //     draft.cartProduct = 
        // }));
    }
} 
