import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';

import { InputFormComponent } from '../input-form/input-form.component';
import { BookmarksService } from '../../services/bookmark.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-toolbar',
  inputs: ['sidenavTarget'],
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss'],
})
export class AppToolbarComponent {
  @Input()
  public sidenavTarget!: MatSidenav;

  constructor(
    private bottomSheet: MatBottomSheet,
    private bookmarks: BookmarksService,
    private categories: CategoryService
  ) {}

  public reloadData() {
    this.bookmarks.getBookmarks();
    this.categories.getCategories();
  }

  public openAddBookmarkBottomSheet() {
    this.bottomSheet.open(InputFormComponent, {
      data: {
        bookmark: null,
        type: 'Add',
      },
    });
  }
}
