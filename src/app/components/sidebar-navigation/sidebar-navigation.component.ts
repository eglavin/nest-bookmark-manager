import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { FilterService } from '../../services/filter.service';
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
    private categories: CategoryService,
    private filter: FilterService
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

    this.filter.activeFilter$.subscribe((value) => {
      this.activeFilterValue = value;
    });
  }

  public filterBookmarks(category: Category) {
    this.filter.setActiveFilter$(
      category._id !== '__all__' ? category.name : ''
    );
  }
}
