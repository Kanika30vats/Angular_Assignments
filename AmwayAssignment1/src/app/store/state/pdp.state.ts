import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import produce from "immer";
import { Product } from 'src/app/model/product';
import { CartService } from "src/app/services/cart.service";
import { AddReviews, GetPdpDetails, GetProductById } from "../actions/pdp.action";
import { CartStateModel } from "./cart.state";

//State Model
export class ProductStateModel {
    product : Product[];
    selectedProduct: any;
    cartProduct!: any[];
    reviewsData!:any[];
    
    

    constructor() {
        this.product = [];
        
    }
}

//State
@State<ProductStateModel>({
    name: 'pdp',
    defaults: {
        product : [],
        selectedProduct:null,
        cartProduct: [],
        reviewsData:[],
        
    }
})

@Injectable()
export class PdpState{

    constructor(
        private cartService: CartService
        ) {

    }
    //Get prod details
    @Selector()
    static getProductList(state: ProductStateModel){
        return state.product;
    }

    @Selector()
    static getSelectedProduct(state: ProductStateModel) {
        return state.selectedProduct;
    }

    @Selector()
    static getReviewsData(state: ProductStateModel) {
        return state.reviewsData;
    }

    // @Selector()
    // static getCartItem(state: CartStateModel){
    //     return state.cartProduct;
    // }

    @Action(GetPdpDetails)
    getProducts({getState, setState}: StateContext<ProductStateModel>){
        console.log('State action');
    }

    @Action(GetProductById)
    setSelectedProduct(context: StateContext<ProductStateModel>, {id, payload}:any){
        
        const state=context.getState();
        
        // const prodList = state.product;
        const prodList = payload;
        const index = prodList.findIndex((pro:any) => pro.id == id);
        
        context.setState({
            ...state,
            product: prodList[index]
        })
        // context.patchState({
        //     product:[...state.product, prodList[index]]
        // })
        
        
    }

    // @Action(AddCart)  
    //  addToCart(context: StateContext<CartStateModel> , { payload}: AddCart) {  

    //     const state = context.getState();  

    //     const cartData = this.cartService.addToCart(payload);

    //      context.patchState({  
    //          cartProduct: [...state.cartProduct, cartData] 
    //      });  
         
         
    //  } 

    @Action(AddReviews)
    addReview(context: StateContext<ProductStateModel>, {payload}: AddReviews){

        
        console.log(payload);
        const state = context.getState();

        // context.setState({
        //     ...state,
        //     reviewsData: payload
        // })
        context.patchState({
            reviewsData:[...state.reviewsData, payload]
        })

        context.setState(produce((draft: any) => {

            draft.reviewsData = payload

            console.log(draft.reviewsData);

          }));


        
        
    }
}