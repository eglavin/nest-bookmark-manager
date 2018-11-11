import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { MongodbService } from '../_services/mongodb.service';
import { Bookmark } from '../_models/bookmark.model';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss']
})
export class BookmarkDetailsComponent implements OnInit {

  bookmarksDataSource: any = [];
  categoryDataSource: any = [];

  displayedColumns: string[] = ['select', 'title', 'href', 'description', 'category'];
  selection = new SelectionModel<Bookmark>(true, []);

  constructor(
    private mdbs: MongodbService
  ) {}
  ngOnInit() {
    this.mdbs.getBookmarkData().subscribe(data => {
      this.bookmarksDataSource = data;
    });
    this.mdbs.getCategoryData().subscribe(data => {
      this.categoryDataSource = data;
    });
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.bookmarksDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.bookmarksDataSource.data.forEach(row => this.selection.select(row));
  }

}
