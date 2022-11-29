import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { InputFormComponent } from './input-form/input-form.component';
import { MongodbService } from './_services/mongodb.service';
import { DataService } from './_services/data.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container class="app-container">
      <mat-sidenav #BookmarkCategories class="side-nav">
        <app-sidebar-navigation></app-sidebar-navigation>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="mat-elevation-z3">
          <mat-toolbar-row>
            <button
              mat-icon-button
              aria-label="Open Category Menu"
              (click)="BookmarkCategories.toggle()"
            >
              <mat-icon>menu</mat-icon>
            </button>

            <span class="toolbar-fill"></span>

            <span> Nest Bookmark Manager </span>

            <span class="toolbar-fill"></span>

            <span>
              <button
                mat-icon-button
                aria-label="Refresh Data"
                (click)="handleReloadData()"
              >
                <mat-icon>refresh</mat-icon>
              </button>

              <button
                mat-button
                aria-label="Open Insert Bookmark Dialogue"
                (click)="handleOpenAddBookmark()"
                class="button"
              >
                <mat-icon>add</mat-icon> Add Bookmark
              </button>
            </span>
          </mat-toolbar-row>
        </mat-toolbar>

        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .app-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        overflow: auto;
        background-color: #e0e0e0;
      }

      .side-nav {
        min-width: 250px;
      }

      span.toolbar-fill {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private bottomSheet: MatBottomSheet,
    private db: MongodbService,
    private data: DataService
  ) {}

  handleReloadData = () => {
    this.db.getBookmarkData().subscribe((data) => {
      this.data.updateBookmarks(data);
    });
    this.data.setUpdate(true);
  };

  handleOpenAddBookmark = () => {
    this.bottomSheet.open(InputFormComponent, {
      data: { id: null, type: 'Add' },
    });
  };

  ngOnInit() {
    this.db.getBookmarkData().subscribe((data) => {
      this.data.updateBookmarks(data);
    });

    this.db.getCategoryData().subscribe((data) => {
      this.data.updateCategories(data);
    });
  }
}
