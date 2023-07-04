import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, single, Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { DataApiService } from 'src/app/services/data-api.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { GetProducts } from 'src/app/store/actions/plp.action';
import { PlpState } from 'src/app/store/state/plp.state';

@Component({
  selector: 'app-plp-page',
  templateUrl: './plp-page.component.html',
  styleUrls: ['./plp-page.component.css']
})
export class PlpPageComponent implements OnInit, OnDestroy {

  constructor(private store: Store, private dataApiService: DataApiService,private router: Router, private dataTransferService: DataTransferService) {
    this.result = [];
   }
  

  result: Product[];
  singleProductData : any;
  sessionData:any;
  newSessionData: any;
  error!:any;

  @Select(PlpState.getProductList) productList$!:Observable<Product[]>;

  @Select(PlpState.productsLoaded) productLoaded$!:Observable<boolean>;

   prodLoadedSubs!: Subscription;

  ngOnInit(): void {


    // this.dataApiService.getProducts()
    // .subscribe(
    //   (data) => {
    //     this.result = data;
    //     console.warn(this.result);
    //   }
    // );

    
    this.productList$.subscribe(res=>{
      console.log('plp state slice', res);

      this.result = res;
    });

    this.getProducts();

    this.singleProductData = this.dataTransferService.singleProdData;
    console.log("SingleProductData", this.singleProductData);
    this.sessionData = this.getData();
    console.warn("sessionData in plp", this.sessionData);

    this.newSessionData = JSON.parse(this.sessionData);

    
    // this.prodFilterById(this.singleProductData.id);
    // this.newSessionData.push(this.singleProductData);
    // console.warn("New session data:", JSON.stringify(this.newSessionData));


  }

  // prodFilterById(prodId:number): void{
  //   this.newSessionData = this.newSessionData.filter(
  //     (data : any) => data.id != prodId
  //   )}

  //   console.warn("hi :", this.sessionData);
  // }


  // getAllData(): Product[]
  // {
  //   let data = this.result;
  //   return data;
  // }


  getProducts(){
    this.prodLoadedSubs = this.productLoaded$.subscribe((prodLoaded)=>{
      if(!prodLoaded){
        this.store.dispatch(new GetProducts());
      } 
    })
    
  }

  addProdPage(){
    sessionStorage.setItem('mockData', JSON.stringify(this.newSessionData));
    // this.router.navigateByUrl("/addProduct",{ state: { id:this.singleProductData.id }});
    this.router.navigateByUrl("/addProduct");
  }

  getData() {
    return sessionStorage.getItem('mockData');
    
  }

  ngOnDestroy(): void {
    this.prodLoadedSubs.unsubscribe();
  }
}
