import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product';
import productData from "src/assets/mockData.json";
import { HttpClient } from "@angular/common/http";
import { DataApiService } from 'src/app/services/data-api.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { Route, Router } from '@angular/router';
import { loadPlugin } from 'immer/dist/internal';





@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {

  @Input() revLen : any;
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();

  
  private mockCategories = productData;
  
  

  reviewForm = new FormGroup({
    reviewName: new FormControl('',[Validators.required]),
    review: new FormControl('', [Validators.required])
  })

  get reviewName() {
    return this.reviewForm.get('reviewName');
  } 
  get reviewFormField() {
    return this.reviewForm.get('review');
  } 

  sessionData: any | undefined;
  reviews: any;
  // products: Product[] = [];
  sessionStorageData: any;
  // singleProd:any = [];
  modifiedSessionData:any;
  singleObj:any;
  result:any = [];
  reviewdata:any = [];
  data:any="";
  reviewLength:any;
  flag:boolean = true;
  arr:any = [];


  constructor(private sessionStorageService: SessionStorageService, private dataTransferService: DataTransferService,private router:Router) {
    // sessionStorageService.saveData();
    this.data=this.router.getCurrentNavigation()?.extras.state;
    console.log(`state data ===`, this.router.getCurrentNavigation()?.extras.state);

    this.reviewLength = 0;
    
    
    
  }


  ngOnInit(): void {

    this.sessionStorageService.saveData();  
    
    // this.modifiedSessionData = sessionStorage.getItem('mockData');
    // this.result = JSON.parse(this.modifiedSessionData).filter((x:any) => {
    //   console.log("checking singleObj", this.data); 
    //   console.log("x1", this.data);
    //   console.log("x", x.id);
    //   return x.id == this.data;
      
      
    // });
    
    // this.reviewdata=this.result[0].review;

    // console.log("lll",this.result[0]);


  }

  ngAfterContentInit(){
    console.log("revLen", this.revLen);
  }


  addReview() {
    
    this.reviewLength = this.dataTransferService.lengthDataService;
    console.warn("length review in reviewPage", this.reviewLength);
    
    // if(this.reviewLength>=4)
    //   this.flag=false;

    // this.mockCategories.push(this.reviews);

    // console.warn("Form Data",this.reviewForm.value);
    // this.reviews.push(this.reviewForm.value);
    // console.warn("reviews array", this.reviews);

    // console.log("test", this.dataTransferService.singleObjData)
    this.singleObj = this.dataTransferService.singleObjData.id;
    console.log("kan",this.dataTransferService.singleObjData);

    if (this.sessionStorageService.getData() == null) {
      this.sessionStorageService.saveData();
    }

    // this.arr = this.dataTransferService.singleObjData.review;
    // console.log("arr", this.dataTransferService.singleObjData.review[0]);
    if(this.revLen>=4)
      this.flag=false;

    this.sessionData = this.sessionStorageService.getData();
    // console.warn("sessionData review comp", this.sessionData);
    this.reviews = (this.reviewForm.value);

    console.warn("child review val", this.reviews);
    console.warn("type review", typeof (this.reviews));
    this.parentFunction.emit(this.reviews);
    this.modifiedSessionData = sessionStorage.getItem('mockData');
    console.warn("check", this.modifiedSessionData);
    
    this.result = JSON.parse(this.modifiedSessionData).filter((x:any) => {
      console.log("x1", this.singleObj);
      console.log("x", x.id);
      return x.id == this.singleObj;
       
    });
    
    this.reviewdata=this.result[0].review;
    console.warn("result", this.reviewdata);
    
    
    console.log("singleObj", this.singleObj);

    // this.singleObj = this.modifiedSessionData.filter(
    //   (data: any) => data.id != this.product.id);


    // console.log("session storage review", sessionStorage.getItem('mockData'));

    // console.warn("sessionData before", this.sessionData);
    // console.warn("type sessionData", typeof(this.sessionData));
    // this.sessionData = this.sessionData.concat(JSON.stringify(this.reviews));
    // console.warn("sessionData after", this.sessionData);
    // this.setData(this.sessionData);
    // console.warn("Session storage data", this.getData());


  }

  // saveData() {
  //   sessionStorage.setItem('mockData', JSON.stringify(this.mockCategories));

  // }

  // getData() {
  //   return sessionStorage.getItem('mockData');
  // }

  // setData(data:any){
  //   sessionStorage.setItem('mockData', data);
  // }

  allReviewPageNavigate()
  {
    this.dataTransferService.reviewDataTransfer = this.reviewdata;
    this.router.navigateByUrl('allReviewsPage');
  }

}
