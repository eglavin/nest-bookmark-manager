import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

import { MongodbService } from '../_services/mongodb.service';
import { DataService } from '../_services/data.service';
import { Bookmark, Category } from '../app.models';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit {
  constructor(
    private db: MongodbService,
    private data: DataService,
    private _bottomSheetRef: MatBottomSheetRef<InputFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private propData: {
      id: null | string;
      type: 'Add' | 'Edit';
    }
  ) {}

  initBookmarksState = {
    _id: {
      $oid: '',
    },
    title: '',
    href: '',
    description: '',
    category: '',
    catname: '',
  };

  bookmarksData: Bookmark[] = [this.initBookmarksState];
  categoryData: Category[] = [];
  inputType = this.propData.type;

  handleReloadData = async () => {
    await this.db.getBookmarkData().subscribe((data) => {
      this.data.updateBookmarks(data);
      this.data.setUpdate(true);
    });

    this._bottomSheetRef.dismiss();
  };

  onSubmitData = async (form: NgForm) => {
    const categoryName = this.categoryData.find(
      (category) => category._id === form.value.category
    );

    if (categoryName?.name) {
      if (this.inputType === 'Edit') {
        await this.db
          .updateBookmark(
            this.bookmarksData[0]._id,
            form.value.title,
            form.value.href,
            form.value.description,
            form.value.category,
            categoryName.name
          )
          .subscribe(() => {
            this.handleReloadData();
          });
      } else if (this.inputType === 'Add') {
        await this.db
          .addBookmark(
            form.value.title,
            form.value.href,
            form.value.description,
            form.value.category,
            categoryName.name
          )
          .subscribe(() => {
            this.handleReloadData();
          });
      }
    }
  };

  ngOnInit() {
    if (this.propData.type === 'Edit' && this.propData.id) {
      this.db.getBookmark(this.propData.id).subscribe((data) => {
        this.bookmarksData = data;
      });
    }

    this.data.categories.subscribe((data) => {
      this.categoryData = data;
    });
  }
}
