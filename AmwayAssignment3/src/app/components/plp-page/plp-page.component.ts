import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { GetFilteredData, GetProducts } from 'src/app/store/actions/product.action';
import { ProductStateClass } from 'src/app/store/states/product.state';

@Component({
  selector: 'app-plp-page',
  templateUrl: './plp-page.component.html',
  styleUrls: ['./plp-page.component.css']
})
export class PlpPageComponent implements OnInit {

  @Select(ProductStateClass.getProducts) products$!: Observable<Product[]>;
  @Select(ProductStateClass.getProductsByFilter) productsByFilter$!: Observable<Product[]>;

  @Input() products!: Product[];
  private noOfProductsToShowInitially: number = 5;
  private itemsToLoad: number = 5;
  @Input() productsToShow!: Product[];
  isAllProductsDisplayed!: boolean;
  priceCheckboxArray: any[] = [];
  allProds: any[] = [];
  tempArrayProdsByPrice: any = [];
  productsByPriceFilter!: any[];
  tempProducts!: Product[];
  tempProductsByPriceFilter: any[] = [];
  checkedArray!: any[];
  filteredProducts!: any[];


  constructor(
    private store: Store,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.checkedArray = [];
    this.tempProducts = this.products;
    this.store.dispatch(new GetProducts());

    // this.getProductsFromState();
    this.productsToShowOnLoad();


    this.priceCheckboxArray = [
      {
        id: 1,
        type: "checkbox",
        price: "10-20000"
      },
      {
        id: 2,
        type: "checkbox",
        price: "20001-40000"
      },
      {
        id: 3,
        type: "checkbox",
        price: "40001-60000"
      },
      {
        id: 4,
        type: "checkbox",
        price: "60001-80000"
      },
      {
        id: 5,
        type: "checkbox",
        price: "80001-100000"
      },
      {
        id: 6,
        type: "checkbox",
        price: "100001-120000"
      }
    ]

    // this.activatedRoute.queryParams.subscribe(
    //   (d) => {
    //     console.log(d);
    //     if(d['inStock'] == 'true'){
    //       // console.log("func called");

    //     }
    //   }
    // );
  }

  getProductsFromState() {
    this.products$.subscribe(
      (prod) => {
        this.products = prod;

      }
    )
  }

  getProductsByFilterFromState() {
    this.productsByFilter$.subscribe(
      (res) => {
        this.filteredProducts = res;
      }
    )
    
    if((!this.checkedArray.includes('inStock')) && (!this.checkedArray.includes('outStock')) && (this.filteredProducts.length == 0))
      this.filteredProducts = this.tempProducts;
    
  }

  // getProductsByPriceFilterFromState() {
  //   this.productsByPriceFilter$.subscribe(
  //     (res) => {
  //       this.productsByPriceFilter = res;

  //       for (let i = 0; i < this.productsByPriceFilter.length; i++) {
  //         var arr = this.productsByPriceFilter[i];
  //         for (let i = 0; i < arr.length; i++) {
  //           var obj = arr[i];
  //           // console.log(obj);
  //           this.tempProductsByPriceFilter.push(obj);
  //         }
  //         console.log(arr);
  //       }
  //       console.log(this.tempProductsByPriceFilter);

  //       this.products = this.tempProductsByPriceFilter;
  //     }
  //   )
  // }

  productsToShowOnLoad() {
    console.log(this.products);

    this.productsToShow = this.products.slice(0, this.noOfProductsToShowInitially);
    console.log(this.productsToShow);
    this.isAllProductsDisplayed = false;
  }

  onScrollDown(ev: any) {

    let isSpinOver = false;
    console.log("scrolled down!!", ev);
    this.spinner.show().then(
      () => {
        setTimeout(
          () => {

            this.spinner.hide();
          }, 500
        )
      }
    );

    isSpinOver = true;

    if (isSpinOver && this.noOfProductsToShowInitially <= this.products.length) {


      this.noOfProductsToShowInitially += this.itemsToLoad;
      this.productsToShow = this.products.slice(0, this.noOfProductsToShowInitially);
      console.log("scrolled");
    } else {
      this.isAllProductsDisplayed = true;
    }
  }

  sort(value: string) {

    switch (value) {
      case "byIdAsc":
        this.sortByIdAsc();
        this.productsToShowOnLoad();
        break;


      case "byPriceAsc":
        this.sortByPriceAsc();
        this.productsToShowOnLoad();
        break;

      case "byPriceDesc":
        this.sortByPriceDesc();
        this.productsToShowOnLoad();
        break;

      case "byNameAsc":
        this.sortByNameAsc();
        this.productsToShowOnLoad();
        break;

      case "byNameDesc":
        this.sortByNameDesc();
        this.productsToShowOnLoad();
        break;

      case "byDateAsc":
        this.sortByDateAsc();
        this.productsToShowOnLoad();
        break;

      case "byDateDesc":
        this.sortByDateDesc();
        this.productsToShowOnLoad();
        break;

      default:
        this.sortByIdAsc();
        break;
    }


  }

  sortByIdAsc() {
    this.products = this.products.slice().sort((a, b) => a.id - b.id);
  }

  sortByPriceAsc() {
    this.products = this.products.slice().sort((a, b) => a.price - b.price);
  }

  sortByPriceDesc() {
    this.products = this.products.slice().sort((a, b) => b.price - a.price);
  }

  sortByNameAsc() {
    this.products = this.products.slice().sort((a, b) => a.name > b.name ? 1 : -1);
  }

  sortByNameDesc() {
    this.products = this.products.slice().sort((a, b) => b.name > a.name ? 1 : -1);
  }

  sortByDateAsc() {
    this.products = this.products.slice().sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
  }

  sortByDateDesc() {
    this.products = this.products.slice().sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  }

  filterByPrice(price: any) {
    this.products = this.products.filter(
      (prod) => {
        return prod.price >= 0 && prod.price < 20001;
      }
    )
    this.ngOnInit();
  }

  // getInStockProducts(e: any) {
  //   if (e.target.checked) {
  //     let result: Product[] = this.products.filter(obj => obj.isAvailable == true);
  //     this.allProds = this.products;
  //     this.products = result;
  //     this.ngOnInit();
  //     // console.log(this.products);

  //   }
  //   else {
  //     // this.getProductsFromState();
  //     this.products = this.allProds;
  //     this.ngOnInit();
  //   }

  // }

  // getOutStockProducts(e: any) {
  //   if (e.target.checked) {
  //     let result: Product[] = this.products.filter(obj => obj.isAvailable == false);
  //     this.allProds = this.products;
  //     this.products = result;
  //     this.ngOnInit();

  //   }
  //   else {
  //     // this.getProductsFromState();
  //     this.products = this.allProds;
  //     this.ngOnInit();
  //   }
  // }

  onCheckboxChange(event: any) {


    // this.store.dispatch(new GetFilteredData(event.target.checked, this.tempProducts, event.target.value));

    // this.getProductsByPriceFilterFromState();



    if (event.target.checked) {
      if (!this.checkedArray.includes(event.target.value)) {
        this.checkedArray.push(event.target.value);
      }
      
      // if(this.checkedArray.includes('inStock') || this.checkedArray.includes('outStock')) {
      //   const indexInStock = this.checkedArray.indexOf('inStock');
      //   const indexOutStock = this.checkedArray.indexOf('outStock');

      //   if(this.checkedArray.includes('inStock')){
      //     this.checkedArray.splice(indexInStock, 1);
      //     this.checkedArray.push('inStock');
      //   }
        
      //   if(this.checkedArray.includes('outStock')){
      //     this.checkedArray.splice(indexOutStock, 1);
      //     this.checkedArray.push('outStock');
      //   }
      // }

      if(this.checkedArray.includes('inStock')) {
          const indexInStock = this.checkedArray.indexOf('inStock');
  
          if(this.checkedArray.includes('inStock')){
            this.checkedArray.splice(indexInStock, 1);
            this.checkedArray.push('inStock');
          }
        }

        if(this.checkedArray.includes('outStock')) {
            const indexOutStock = this.checkedArray.indexOf('outStock');
    
            if(this.checkedArray.includes('outStock')){
              this.checkedArray.splice(indexOutStock, 1);
              this.checkedArray.push('outStock');
            }
          }
          
    }

    if(!event.target.checked){
      const index = this.checkedArray.indexOf(event.target.value);
      
      this.checkedArray.splice(index, 1);
    }

    console.log(this.checkedArray);
    
    this.store.dispatch(new GetFilteredData(this.tempProducts, this.checkedArray));
    this.getProductsByFilterFromState();
    this.products = this.filteredProducts;
    this.productsToShowOnLoad();
  }

}
