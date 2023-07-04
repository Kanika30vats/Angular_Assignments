import { Product } from "src/app/model/product";

export class GetProducts {
    static readonly type = '[Products] Get';
}

export class GetProductBySubCategoryId {
    static readonly type = '[ProductById] Get';

    constructor(public subCategoryId: number[]) { }
}

export class GetFilteredData {
    static readonly type = '[FilteredProduct] Get';

    constructor(public products: Product[], public filter: any[]) { };
}