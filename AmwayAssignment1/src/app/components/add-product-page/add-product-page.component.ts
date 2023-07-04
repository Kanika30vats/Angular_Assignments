import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DataApiService } from 'src/app/services/data-api.service';
import { AddProduct } from 'src/app/store/actions/plp.action';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css']
})
export class AddProductPageComponent implements OnInit {
  url: any;
  path: string = "assets/img/";

  constructor(private store:Store, private dataApiService: DataApiService, private router: Router) { }

  ngOnInit(): void {
  }

  addProduct(formData: any) {

    formData.imageUrl = this.path;

    // this.dataApiService.addProduct(formData)
    //   .subscribe(
    //     (data) => {
    //       console.warn("added Product", data);
    //     }
    //   );
    // this.router.navigateByUrl('homePage');


    this.store.dispatch(new AddProduct(formData));
    this.router.navigateByUrl('homePage');
 
     


  }

  selectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // console.log("kjkj", event.target.files[0].name);
      this.path = this.path + event.target.files[0].name;
      console.warn("path", this.path);
      reader.onload = (event: any) => {

        this.url = event.target.result;
        //  console.warn(event);
        //  console.warn("url", this.url);
      }


      reader.readAsDataURL(event.target.files[0]);

    }

  }



  // (e: Event): void
  // {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = (event:any) => {
  //     this.url = event.target.result;
  //   }
  // }
}
