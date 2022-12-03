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

  public isUpdate = this.propData.type.trim().toLowerCase() === 'edit';
  public allowSave = true;

  public bookmarksData: NewBookmark | Bookmark = {
    title: '',
    href: '',
    description: '',
    category: '',
  };

  public closeBottomSheet() {
    this._bottomSheetRef.dismiss();
  }

  ngOnInit() {
    this.categories.categories$.subscribe((data) => {
      this.categoriesData = data;
    });

    if (this.isUpdate) {
      if (this.propData.bookmark) {
        this.bookmarksData = {
          ...this.bookmarksData,
          ...this.propData.bookmark,
        };

        return;
      }

      this.closeBottomSheet();
    }
  }

  public async submitForm(form: NgForm) {
    this.allowSave = false;

    try {
      if (this.isUpdate) {
        if (!this.propData.bookmark?._id) {
          throw new Error('Missing bookmark id');
        }

        const saved = await this.bookmarks.updateBookmark({
          _id: this.propData.bookmark._id,
          href: form.value.href,
          title: form.value.title,
          description: form.value.description,
          category: form.value.category,
        });

        if (saved) {
          this.closeBottomSheet();
        }
      } else {
        const saved = await this.bookmarks.addBookmark({
          href: form.value.href,
          title: form.value.title,
          description: form.value.description,
          category: form.value.category,
        });

        if (saved) {
          this.closeBottomSheet();
        }
      }
    } catch (error) {
      console.error(error);
    }

    this.allowSave = true;
  }
}
