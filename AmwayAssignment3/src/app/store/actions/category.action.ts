export class GetCategories{
    static readonly type = '[Categories] Get';
}

export class GetSubCategories{
    static readonly type = '[SubCategories] Get';

    constructor(public categoryId: number){}
}