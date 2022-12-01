import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

import { BookmarksService } from '../../services/bookmark.service';
import { CategoryService } from '../../services/category.service';
import type { Bookmark, NewBookmark } from '../../models/bookmark.model';
import type { Category } from '../../models/category.model';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit {
  public categoriesData: Category[] = [];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<InputFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private propData: { bookmark: null | Bookmark; type: 'Add' | 'Edit' },

    private bookmarks: BookmarksService,
    private categories: CategoryService
  ) {}

  public inputType = this.propData.type;
  public bookmarksData: NewBookmark | Bookmark = {
    title: '',
    href: '',
    description: '',
    category: '',
  };

  ngOnInit() {
    this.categories.categories$.subscribe((data) => {
      this.categoriesData = data;
    });

    if (this.propData.type === 'Edit') {
      if (this.propData.bookmark) {
        this.bookmarksData = {
          ...this.bookmarksData,
          ...this.propData.bookmark,
        };
      } else {
        this._bottomSheetRef.dismiss();
        return;
      }
    }
  }

  public closeCard() {
    this._bottomSheetRef.dismiss();
  }

  public submitForm(form: NgForm) {
    const categoryName = this.categoriesData.find(
      (category) => category._id === form.value.category
    );

    if (categoryName?.name) {
      switch (this.inputType) {
        case 'Add': {
          this.bookmarks
            .addBookmark(
              form.value.title,
              form.value.href,
              form.value.description,
              form.value.category,
              categoryName.name
            )
            .subscribe(() => {
              this.bookmarks.getBookmarks();

              this._bottomSheetRef.dismiss();
            });
          break;
        }

        case 'Edit': {
          this.bookmarks
            .updateBookmark(
              this.propData.bookmark?._id!,
              form.value.title,
              form.value.href,
              form.value.description,
              form.value.category,
              categoryName.name
            )
            .subscribe(() => {
              this.bookmarks.getBookmarks();

              this._bottomSheetRef.dismiss();
            });
          break;
        }
      }
    }
  }
}
