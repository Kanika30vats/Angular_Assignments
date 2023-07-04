import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import produce from 'immer';
import { Product } from "src/app/model/product";
import { ProductService } from "src/app/services/product.service";
import { GetFilteredData, GetProductBySubCategoryId, GetProducts } from "../actions/product.action";

export class ProductStateModel {
    allProducts: any;
    productsFilteredBySubCategory: any;
    productsByFilter: any[];

    constructor() {
        this.allProducts = [];
        this.productsByFilter = [];
    }
}

@State<ProductStateModel>(
    {
        name: 'productState',
        defaults: {
            allProducts: [],
            productsFilteredBySubCategory: [],
            productsByFilter: []
        }
    }
)

@Injectable()
export class ProductStateClass {

    filteredData!: any[];
    newArrayOfFilteredData: any[] = [];

    constructor(private productService: ProductService) {

    }

    @Selector()
    static getProducts(state: ProductStateModel) {
        return state.allProducts;
    }

    @Selector()
    static getProductsBySubCategory(state: ProductStateModel) {
        return state.productsFilteredBySubCategory;
    }

    @Selector()
    static getProductsByFilter(state: ProductStateModel) {
        return state.productsByFilter;
    }

    @Action(GetProducts)
    getProducts(context: StateContext<ProductStateModel>) {

        this.productService.getProducts().subscribe(
            res => {
                const state = context.getState();

                context.setState(produce((draft: ProductStateModel) => {
                    draft.allProducts = res;

                }));

            }
        )

    }

    // @Action(GetProductBySubCategoryId)
    // getProductBySubCategory(context: StateContext<ProductStateModel>, { subCategoryId }: any) {

    //     const state = context.getState();

    //     let dataFilteredByCategory: any[];
    //     dataFilteredByCategory = [];

    //     if (state.allProducts.length > 0) {
    //         state.allProducts.forEach((element: any) => {
    //             element.subCategoryId.forEach((item: any) => {
    //                 if (item == subCategoryId) {
    //                     dataFilteredByCategory.push(element);

    //                 }
    //             })
    //         });

    //         context.setState(produce((draft: ProductStateModel) => {
    //             draft.productsFilteredBySubCategory = dataFilteredByCategory;

    //         }));
    //     }
    //     else {
    //         this.productService.getProductsById(subCategoryId).subscribe(
    //             res => {
    //                 context.setState(produce((draft: ProductStateModel) => {
    //                     draft.productsFilteredBySubCategory = res;

    //                 }));
    //             }
    //         );
    //     }
    // }

    @Action(GetProductBySubCategoryId)
    getProductBySubCategory(context: StateContext<ProductStateModel>, { subCategoryId }: GetProductBySubCategoryId) {

        console.log(subCategoryId);

        const state = context.getState();

        let dataFilteredByCategory: any[];
        dataFilteredByCategory = [];

        if (state.allProducts.length > 0) {

            const subCategoryIdSet = new Set(subCategoryId);
            console.log(subCategoryIdSet);

            const dataFilteredByCategory = state.allProducts.filter((prod: any) =>
                prod.subCategoryId.some((id: any) => subCategoryIdSet.has(id))

            );

            context.setState(produce((draft: ProductStateModel) => {
                draft.productsFilteredBySubCategory = dataFilteredByCategory;

            }));
        }
        else {
            this.productService.getProductsById(subCategoryId).subscribe(
                res => {
                    context.setState(produce((draft: ProductStateModel) => {
                        draft.productsFilteredBySubCategory = res;

                    }));
                }
            );
        }
    }

    // @Action(GetFilteredData)
    // getProductsByPriceFilter(context: StateContext<ProductStateModel>, { checked, products, priceFilter }: GetFilteredData) {

    //     let filteredData: any[] = [];
    //     if (checked) {
    //         console.log("in true");


    //         if (priceFilter == "1") {

    //             filteredData.push(products.filter(
    //                 (prod: any) => {
    //                     return prod.price >= 0 && prod.price <= 20000;
    //                 }
    //             ));

    //         }

    //         if (priceFilter == "2") {
    //             filteredData.push(products.filter(
    //                 (prod: any) => {
    //                     return prod.price >= 20001 && prod.price <= 40000;
    //                 }
    //             ));
    //         }

    //         if (priceFilter == "3") {
    //             filteredData.push(products.filter(
    //                 (prod: any) => {
    //                     return prod.price >= 40001 && prod.price <= 60000;
    //                 }
    //             ));
    //         }

    //         if (priceFilter == "4") {
    //             filteredData.push(products.filter(
    //                 (prod: any) => {
    //                     return prod.price >= 60001 && prod.price <= 80000;
    //                 }
    //             ));
    //         }

    //         if (priceFilter == "5") {
    //             filteredData.push(products.filter(
    //                 (prod: any) => {
    //                     return prod.price >= 80001 && prod.price <= 100000;
    //                 }
    //             ));
    //         }

    //         if (priceFilter == "6") {
    //             filteredData.push(products.filter(
    //                 (prod: any) => {
    //                     return prod.price >= 100001 && prod.price <= 120000;
    //                 }
    //             ));
    //         }

    //         // console.log(this.filteredData);

    //         context.setState(produce((draft: ProductStateModel) => {

    //             draft.productsByPriceFilter = Array.from(filteredData);

    //         }));
    //     }

    // }


    @Action(GetFilteredData)
    getProductsByFilter(context: StateContext<ProductStateModel>, { products, filter }: GetFilteredData) {
        this.filteredData = [];
        let tempFilteredData: any[] = [];
        let stockFilteredData: any[];

        this.getProductsByPriceFilterArray(products, filter);

        filter.forEach(
            (item) => {
                // if (item == "1") {

                //     this.filteredData.push(products.filter(
                //         (prod: any) => {
                //             return prod.price >= 0 && prod.price <= 20000;
                //         }
                //     ));

                // }

                // if (item == "2") {
                //     this.filteredData.push(products.filter(
                //         (prod: any) => {
                //             return prod.price >= 20001 && prod.price <= 40000;
                //         }
                //     ));
                // }

                // if (item == "3") {
                //     this.filteredData.push(products.filter(
                //         (prod: any) => {
                //             return prod.price >= 40001 && prod.price <= 60000;
                //         }
                //     ));
                // }

                // if (item == "4") {
                //     this.filteredData.push(products.filter(
                //         (prod: any) => {
                //             return prod.price >= 60001 && prod.price <= 80000;
                //         }
                //     ));
                // }

                // if (item == "5") {
                //     this.filteredData.push(products.filter(
                //         (prod: any) => {
                //             return prod.price >= 80001 && prod.price <= 100000;
                //         }
                //     ));
                // }

                // if (item == "6") {
                //     this.filteredData.push(products.filter(
                //         (prod: any) => {
                //             return prod.price >= 100001 && prod.price <= 120000;
                //         }
                //     ));
                // }

                if (this.filteredData.length) {
                    stockFilteredData = [];
                    if ((filter.includes('inStock')) && (filter.includes('outStock'))) {
                        // this.getProductsByPriceFilterArray(products, filter);
                        stockFilteredData = tempFilteredData;


                    }
                    else if (item == "inStock") {

                        stockFilteredData.push(tempFilteredData.filter(
                            (prod: any) => {
                                return prod.isAvailable == true;
                            }
                        ));


                    }
                    else if (item == "outStock") {

                        stockFilteredData.push(tempFilteredData.filter(
                            (prod: any) => {
                                return prod.isAvailable == false;
                            }
                        ));
                    }
                }
                else {
                    stockFilteredData = [];
                    if ((filter.includes('inStock')) && (filter.includes('outStock'))) {
                        stockFilteredData = products;


                    }else
                    if (item == "inStock") {
                        stockFilteredData.push(products.filter(
                            (prod: any) => {
                                return prod.isAvailable == true;

                            }
                        ));

                    }
                    else
                    if (item == "outStock") {

                        stockFilteredData.push(products.filter(
                            (prod: any) => {
                                return prod.isAvailable == false;
                            }
                        ));
                    }

                }



                tempFilteredData = [];
                if (stockFilteredData.length == 0) {
                    for (let i = 0; i < this.filteredData.length; i++) {
                        var arr = this.filteredData[i];
                        tempFilteredData = tempFilteredData.concat(arr);

                    }
                }

                else if (stockFilteredData.length && this.filteredData.length) {
                    for (let i = 0; i < stockFilteredData.length; i++) {
                        var arr = stockFilteredData[i];
                        tempFilteredData = tempFilteredData.concat(arr);
                    }
                }
                else if (stockFilteredData.length) {
                    for (let i = 0; i < stockFilteredData.length; i++) {
                        var arr = stockFilteredData[i];
                        tempFilteredData = tempFilteredData.concat(arr);
                    }
                }
            }
        )
        console.log("tempflData", tempFilteredData);

        context.setState(produce((draft: ProductStateModel) => {

            draft.productsByFilter = Array.from(tempFilteredData);

        }));
    }

    getProductsByPriceFilterArray(products: Product[], filter: any[]) {
        filter.forEach(
            (item) => {
                if (item == "1") {

                    this.filteredData.push(products.filter(
                        (prod: any) => {
                            return prod.price >= 0 && prod.price <= 20000;
                        }
                    ));

                }

                if (item == "2") {
                    this.filteredData.push(products.filter(
                        (prod: any) => {
                            return prod.price >= 20001 && prod.price <= 40000;
                        }
                    ));
                }

                if (item == "3") {
                    this.filteredData.push(products.filter(
                        (prod: any) => {
                            return prod.price >= 40001 && prod.price <= 60000;
                        }
                    ));
                }

                if (item == "4") {
                    this.filteredData.push(products.filter(
                        (prod: any) => {
                            return prod.price >= 60001 && prod.price <= 80000;
                        }
                    ));
                }

                if (item == "5") {
                    this.filteredData.push(products.filter(
                        (prod: any) => {
                            return prod.price >= 80001 && prod.price <= 100000;
                        }
                    ));
                }

                if (item == "6") {
                    this.filteredData.push(products.filter(
                        (prod: any) => {
                            return prod.price >= 100001 && prod.price <= 120000;
                        }
                    ));
                }
            }
        )
    }

}