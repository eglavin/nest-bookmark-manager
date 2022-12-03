import { Component, OnInit } from '@angular/core';

import { BookmarksService } from 'src/app/services/bookmark.service';
import { CategoryService } from '../../services/category.service';
import type { Category } from '../../models/category.model';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent implements OnInit {
  public categoryData: Category[] = [
    {
      _id: '__all__',
      name: 'All',
    },
  ];

  public activeFilterValue = '';

  constructor(
    private bookmarks: BookmarksService,
    private categories: CategoryService
  ) {}

  ngOnInit() {
    this.categories.categories$.subscribe((data) => {
      this.categoryData = [
        {
          _id: '__all__',
          name: 'All',
        },
        ...data,
      ];
    });

    this.bookmarks.categoryFilter$.subscribe((value) => {
      this.activeFilterValue = value;
    });
  }

  public filterBookmarks(category: Category) {
    this.bookmarks.setCategoryFilter$(
      category._id !== '__all__' ? category._id : ''
    );
  }
}
