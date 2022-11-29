import { Component, OnInit } from '@angular/core';

import { DataService } from './_services/data.service';
import { Category } from './app.models';

@Component({
  selector: 'app-sidebar-navigation',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z3">
      <span>Categories</span>
    </mat-toolbar>

    <mat-nav-list>
      <mat-list-item
        *ngFor="let category of categoryData"
        (click)="filter(category.name)"
      >
        {{ category.name }}
      </mat-list-item>
    </mat-nav-list>
  `,
})
export class SidebarNavigationComponent implements OnInit {
  categoryData: Category[] = [];

  constructor(private data: DataService) {}

  filter = (category: string) => {
    this.data.updateFilter(category);
  };

  ngOnInit() {
    this.data.categories.subscribe((data) => {
      this.categoryData = data;
    });
  }
}
