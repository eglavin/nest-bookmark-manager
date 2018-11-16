import { Component, OnInit } from '@angular/core';

import { MongodbService } from '../_services/mongodb.service';

@Component({
  selector: 'app-bookmark-add',
  templateUrl: './bookmark-add.component.html',
  styleUrls: ['./bookmark-add.component.scss']
})
export class BookmarkAddComponent implements OnInit {

  categoryDataSource: any = [];

  constructor(
    private mdbs: MongodbService
  ) { }

  ngOnInit() {
    this.mdbs.getCategoryData().subscribe(data => {
      this.categoryDataSource = data;
    });
  }

  cancel(): void {
    //this.dialogRef.close();
  }
}
