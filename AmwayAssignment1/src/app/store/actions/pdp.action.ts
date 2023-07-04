import { Product } from "src/app/model/product";

export class GetPdpDetails{
    static readonly type = '[PdpDetails] Get';
}

export class GetProductById{
    static readonly type = '[ProductById] Get';

    constructor(public id: number, public payload: Product){}
}

// export class AddCart{
//     static readonly type = '[Cart] Add';

//     constructor(public payload: Product, qty:any){}
// }

export class AddReviews{
    static readonly type = '[Reviews] Add';

    constructor(public payload: Product){}
}