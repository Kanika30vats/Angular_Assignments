import { Product } from "src/app/model/product";

export class GetCartProduct{
    static readonly type = '[Product] Get';
}

export class AddCart{
    static readonly type = '[Cart] Add';

    constructor(public payload: Product){}
}

export class DeleteProduct{
    static readonly type = '[Product] Delete';

    constructor(public id: number){}
}

export class DeleteAll{
    static readonly type = '[Product] DeleteAll';
}

