import { DataTransferService } from "../services/data-transfer.service";
import { Product } from "./product";

export class CartItem
{
    constructor(products:Product, private qty:any)
    {
        this.products = products;
        this.price = this.getPrice();
    }

    products: Product;
    price:number = 0;
    quantity:number = parseInt(this.qty);

    getPrice(): number
    {
        // this.quantity = parseInt(this.a);
        return this.products.price * this.quantity;
    }
}