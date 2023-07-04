import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.css']
})
export class AllReviewsComponent implements OnInit {

  reviewData:any;

  constructor(private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.reviewData = this.dataTransferService.reviewDataTransfer;
    console.log("in all review", this.reviewData);
  }

  


}
