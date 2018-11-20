import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatBottomSheet, MatBottomSheetRef } from '@angular/material';

import { BookmarkAddComponent } from '../bookmark-add/bookmark-add.component';
import { BookmarkDetailsUpdateComponent } from '../bookmark-details-update/bookmark-details-update.component';
import { MongodbService } from '../_services/mongodb.service';

export interface Bookmark {
  title: string;
  href: string;
  description: string;
  category: string;
}


@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss']
})

export class BookmarkDetailsComponent implements OnInit {

  constructor(
    private mdbs: MongodbService,
    public bottomSheet: MatBottomSheet
  ) {}

  bookmarksDataSource: Bookmark[];
  categoryDataSource: any = [];

  displayedColumns: string[] = ['title', 'href', 'description', 'category', 'options'];
  dataSourceSort = new MatTableDataSource(this.bookmarksDataSource);

  @ViewChild(MatSort) sort: MatSort;

  

  ngOnInit() {
    this.mdbs.getBookmarkData().subscribe(data => {
      this.bookmarksDataSource = data;
    });
    this.mdbs.getCategoryData().subscribe(data => {
      this.categoryDataSource = data;
    });

    this.dataSourceSort.sort = this.sort;
  }

  addBookmark(): void {
    this.bottomSheet.open(BookmarkAddComponent);
  }

  edit(): void {
    this.bottomSheet.open(BookmarkDetailsUpdateComponent,{
      data: {
        myString: "s",
      }
    });
  }

  Delete(id: string) {
    this.mdbs.deleteBookmark(id).subscribe();
    this.ngOnInit();
  }
}
