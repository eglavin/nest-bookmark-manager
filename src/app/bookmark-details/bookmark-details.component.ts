import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';

// Imports Components
import { BookmarkAddComponent } from '../bookmark-add/bookmark-add.component';
import { BookmarkDetailsUpdateComponent } from '../bookmark-details-update/bookmark-details-update.component';

// Imports Mongo DB Service
import { MongodbService } from '../_services/mongodb.service';

// Imports Data Model
import { Bookmark } from '../_models/bookmark.model';
import { Category } from '../_models/category.model';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss']
})

export class BookmarkDetailsComponent implements OnInit {

  constructor(
    private mdbs: MongodbService,
    private bottomSheet: MatBottomSheet
  ) {}

  // Variables
  bookmarksDataSource: Bookmark[];
  categoryDataSource: Category[];

  // Initializes Table Titles
  displayedColumns: string[] = ['title', 'href', 'description', 'category', 'options'];

  // Reads and Initializes variables with data from mongodb.service
  ngOnInit() {
    this.mdbs.getBookmarkData().subscribe(data => {
      this.bookmarksDataSource = data;
    });
    this.mdbs.getCategoryData().subscribe(data => {
      this.categoryDataSource = data;
    });
  }

  // Opens Create bottomsheet
  addBookmark(): void {
    this.bottomSheet.open(BookmarkAddComponent);
  }

  // Opens Update bottomsheet and posts the id of the current item
  edit(id: string): void {
    this.bottomSheet.open(BookmarkDetailsUpdateComponent, {
      data: {
        id: id,
      }
    });
  }

  // Deletes item from databse
  delete(id: string) {
    this.mdbs.deleteBookmark(id).subscribe();
    this.reload();
  }

  reload(): void {
    window.location.reload();
  }
}
