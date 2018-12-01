import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

// Imports Mongo DB Service
import { MongodbService } from '../_services/mongodb.service';

// Imports Data Model
import { Bookmark } from '../_models/bookmark.model';
import { Category } from '../_models/category.model';

@Component({
  selector: 'app-bookmark-details-update',
  templateUrl: './bookmark-details-update.component.html',
  styleUrls: ['./bookmark-details-update.component.scss']
})
export class BookmarkDetailsUpdateComponent implements OnInit {

  // Variables
  bookmarksDataSource: Bookmark[];
  categoryDataSource: Category[];

  constructor(
    private router: Router,
    private mdbs: MongodbService,
    // Pulls item id for the item to be edited from the bookmark-details components
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
    this.mdbs.getBookmark(this.data.id).subscribe(data => {
      this.bookmarksDataSource = data;
    });
    this.mdbs.getCategoryData().subscribe(data => {
      this.categoryDataSource = data;
    });
  }

  // Sends update to the service
  onEditBookmark(form: NgForm) {
    const catname = this.categoryDataSource.find(x => x._id === form.value.category).name;

    this.mdbs.updateBookmark(
      this.bookmarksDataSource[0]._id,
      form.value.title,
      form.value.href,
      form.value.description,
      form.value.category,
      catname
      ).subscribe();
  }
}
