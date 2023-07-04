import { Product } from "src/app/model/product";

export class GetProducts{
    static readonly type = '[GetProducts] Get';
}

export class AddProduct{
    static readonly type = '[Product] Add';

    constructor(public payload: Product){}
}

// export class GetProductById{
//     static readonly type = '[ProductById] Get';

//     constructor(public id: number){}
// }

export class SetSelectedProduct{
    static readonly type = '[Product] Set';
    constructor(public id: number){}
}

export class ProductLoadFailure{
    static readonly type = '[Error] Set';

    constructor(public err: any){}

}

