import { Component, OnInit } from '@angular/core';
import { MongodbService } from '../_services/mongodb.service';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss']
})
export class BookmarkDetailsComponent implements OnInit {

  dataSource: any = [];
  displayedColumns: string[] = ['title', 'href', 'description', 'category'];

  constructor(
    private mdbs: MongodbService
  ) {

  }

  ngOnInit() {
    this.mdbs.getBookmarkData().subscribe(data => {
      this.dataSource = data;
    });

  }

}
