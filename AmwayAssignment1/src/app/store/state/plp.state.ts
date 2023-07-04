import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Product } from "src/app/model/product";
import { DataApiService } from "src/app/services/data-api.service";
import { AddProduct, GetProducts, SetSelectedProduct } from "../actions/plp.action";

//State Model
export class ProductStateModel {
    product: Product[];
    productsLoaded: boolean;
    selectedProducts: any;
    error!:string;
    isError!:boolean;

    constructor() {
        this.product = [];
        this.productsLoaded = false;
        this.selectedProducts=null

    }
}

//State
@State<ProductStateModel>({
    name: 'plp',
    defaults: {
        product: [],
        productsLoaded: false,
        selectedProducts: null,
        error:'',
        isError:false
    }
})

@Injectable()
export class PlpState {

    constructor(private dataApiService: DataApiService) {

    }

    //Get prod details
    @Selector()
    static getProductList(state: ProductStateModel) {
        return state.product;
    }

    //Get loaded products info
    @Selector()
    static productsLoaded(state: ProductStateModel) {
        return state.productsLoaded;
    }

    //Get selected product from state
    // @Selector()
    // static getSelectedProduct(state: ProductStateModel) {
    //     return state.selectedProducts;
    // }

    // @Action(GetProducts)
    // getProducts({getState, setState}: StateContext<ProductStateModel>){

    //     return this.dataApiService.getProducts().pipe(tap(res=>{

    //         const state = getState();
    //         setState({
    //             ...state,
    //             product:res
    //         })

    //     }));
    // }

    @Action(GetProducts)
    getProducts(context: StateContext<ProductStateModel>) {

        try{
            return this.dataApiService.getProducts().subscribe(res => {

                const state = context.getState();
                context.setState({
                    ...state,
                    product: res,
                    productsLoaded: true
                })
    
            });
        }
        catch(error){
            const state = context.getState();

            context.setState({
                ...state,
                isError:true
            })
            console.log(state.isError);
            return 'Error occured. Retry!';
        }

    }

    @Action(SetSelectedProduct)
    setSelectedProduct(context: StateContext<ProductStateModel>, {id}:SetSelectedProduct){
        // console.log('id', id);

        const state=context.getState();
        const prodList = state.product;

        const index = prodList.findIndex(pro => pro.id == id);
        console.log(prodList[index]);

        context.setState({
            ...state,
            selectedProducts: prodList[index]
        })
    }

    @Action(AddProduct)  
     add(context: StateContext<ProductStateModel> , { payload }: any) {  
      
         
        return this.dataApiService.addProduct(payload).subscribe(res=>{
            const state = context.getState();

            context.patchState({
                product:[...state.product, payload]
            })
        });
     }  

    


}