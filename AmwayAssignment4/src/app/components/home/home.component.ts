import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ProductService) { }

  result: Product[] | undefined;

  ngOnInit(): void {
    this.service.getProducts()
    .subscribe(
      (data) => {
        this.result = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
