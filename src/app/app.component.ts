import { Component, OnInit } from '@angular/core';

import { BookmarksService } from './services/bookmark.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side">
        <app-sidebar-navigation></app-sidebar-navigation>
      </mat-sidenav>

      <mat-sidenav-content>
        <app-toolbar [sidenavTarget]="sidenav"></app-toolbar>

        <div class="routes">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav-container {
        display: grid;
        justify-items: stretch;
        align-items: stretch;
      }

      mat-sidenav {
        min-width: 250px;
        border: 0;
      }

      mat-sidenav-content {
        display: grid;
        justify-items: stretch;
        align-items: stretch;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr;

        div.routes {
          overflow: auto;
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private bookmarks: BookmarksService,
    private categories: CategoryService
  ) {}

  ngOnInit() {
    this.bookmarks.getBookmarks();
    this.categories.getCategories();
  }
}
