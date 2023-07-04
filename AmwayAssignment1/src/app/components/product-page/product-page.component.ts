import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import { CartItem } from 'src/app/model/cartItem';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { AddCart } from 'src/app/store/actions/cart.action';


import { AddReviews, GetPdpDetails, GetProductById } from 'src/app/store/actions/pdp.action';
import { SetSelectedProduct } from 'src/app/store/actions/plp.action';
import { CartState } from 'src/app/store/state/cart.state';
import { PdpState } from 'src/app/store/state/pdp.state';
import { PlpState } from 'src/app/store/state/plp.state';
import { CartPageComponent } from '../cart-page/cart-page.component';
import { ReviewPageComponent } from '../review-page/review-page.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  @ViewChild(ReviewPageComponent) review: any;


  id!: number;
  product: any = [];
  dataFromReviewComponent: any[];
  modifiedProd: any;
  sessionData: any = [];
  flag: boolean = true;
  revlength: any;
  singleProduct!: Product
  reviews!:any;
  

  // cart!: Cart;

  @Select(PlpState.getProductList) products$!: Observable<Product>;
  @Select(PdpState.getProductList) selectedProds$!: Observable<Product>;
  @Select(PdpState.getReviewsData) reviewsData$!: Observable<Product>;


  products: any;

  selectedProduct!: Subscription;

  constructor(
    private dataTransferService: DataTransferService,
    private route: ActivatedRoute,
    private dataApiService: DataApiService,
    private cartService: CartService,
    private router: Router,
    private store: Store
  ) {


    this.dataFromReviewComponent = [];
    this.id = this.route.snapshot.params['id'];


    // this.dataApiService.getProductById(this.id).subscribe(
    //   (res) => {
    //     this.product = res;
    //     this.dataTransferService.singleObjData = this.product;

    //   }
    // );


  }


  ngOnInit(): void {
    // console.warn("pdp pdp", sessionStorage.getItem('mockData'));/
    this.getProduct();
    this.getSelectedProd();
  }

  // getProDetail(){
  //   this.store.dispatch(new GetPdpDetails());

  // }

  getSelectedProd() {
    this.selectedProds$.subscribe(res => {
      this.singleProduct = res;
      this.dataTransferService.singleObjData = res;
    })
    console.log('sp', this.singleProduct);
  }

  getProduct() {
    console.log("Prod data Type", typeof (this.product));
    // this.id = this.route.snapshot.params['id'];


    this.products$.subscribe(res => {
      // this.product=res;
      console.log('res', res);
      this.products = res;
    })

    this.store.dispatch(new GetProductById(this.route.snapshot.params['id'], this.products));
  }

  parentFunction(data: any) {
    this.dataFromReviewComponent = this.dataFromReviewComponent.concat(data);
    // this.dataFromReviewComponent.push(data);

    // console.log("filtered sessionData", this.sessionData);

    // JSON.stringify(this.sessionData);


    // this.product = Object.assign(this.product, this.dataFromReviewComponent);


    // console.log("product", this.product);


    this.sessionData = sessionStorage.getItem('mockData');
    this.sessionData = JSON.parse(this.sessionData);
    // console.log('sessionData', this.sessionData);
    // this.product['review'] = this.dataFromReviewComponent;
    // console.log("prod", this.product);


    // this.modifiedProd = JSON.stringify(this.product) + this.dataFromReviewComponent;
    // console.log("Product review key", this.product['review']=[data]);

    this.sessionData = this.sessionData.filter(
      (data: any) => data.id == this.singleProduct.id);
    console.log('checkdata', this.sessionData);



    this.sessionData[0]['review'] = this.dataFromReviewComponent
    // this.sessionData.push(this.product);
    console.log('session', this.sessionData);
    this.store.dispatch(new AddReviews(this.sessionData));

// console.log(this.reviewsData$);

    this.reviewsData$.subscribe(res => {
      console.log(res);
      
      this.reviews = res;
      
    })
    
    console.log(this.reviews);
    sessionStorage.setItem('mockData', JSON.stringify(this.reviews));
console.log(JSON.stringify(this.reviews));



    // sessionStorage.setItem('mockData', JSON.stringify(this.sessionData));
    console.log("session storage after processing", sessionStorage.getItem('mockData'));

    this.revlength = this.dataFromReviewComponent.length;
    console.log("revlength", this.revlength);
    this.dataTransferService.lengthDataService = this.revlength;


    console.warn("reviewArray length", this.dataFromReviewComponent.length);




    // this.product.push(this.dataFromReviewComponent);
    // console.warn("pro", this.product);


    //   if(this.flag){
    //   this.flag = false;
    // }
    //   this.sessionData = this.sessionData.filter(
    //     (data : any) => data.id != this.product.id);


    // console.log("sessionData", JSON.stringify(this.sessionData));
    // this.sessionData = JSON.stringify(this.sessionData);

    // console.warn("sessionStorage pdp", sessionStorage.getItem('mockData'));




    // this.product.reviewName = this.dataFromReviewComponent.reviewName;
    // this.product.review = this.dataFromReviewComponent.review;


    // this.modifiedProd = this.product;
    // this.dataTransferService.singleProdData = this.modifiedProd;
  }


  addToCart() {

    // this.cartService.addToCart(this.product);
    this.store.dispatch(new AddCart(this.singleProduct));
    this.router.navigateByUrl('cartPage');


  }




  changeQuantity(quantityString: string) {
    const quantity = parseInt(quantityString);
    this.dataTransferService.data = quantity;

    // this.cartService.changeQuantity(quantity, this.product.id);
    // this.setCart();
    // this.product.price = cartItem.getPrice();

  }

  ngOnDestroy(): void {
    this.selectedProduct?.unsubscribe();
  }

}
