import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { InputFormComponent } from '../input-form/input-form.component';
import { BookmarksService } from '../../services/bookmark.service';
import { FilterService } from '../../services/filter.service';
import type { Bookmark } from '../../models/bookmark.model';

@Component({
  selector: 'app-bookmarks-table',
  templateUrl: './bookmarks-table.component.html',
  styleUrls: ['./bookmarks-table.component.scss'],
})
export class BookmarksTableComponent implements OnInit {
  @ViewChild(MatPaginator)
  public paginator: MatPaginator | null = null;

  public tableColumns = ['title', 'href', 'description', 'category', 'options'];
  public tableData: MatTableDataSource<Bookmark> = new MatTableDataSource(
    [] as Bookmark[]
  );

  public activeFilterValue = '';

  constructor(
    private bottomSheet: MatBottomSheet,
    private bookmarks: BookmarksService,
    private filter: FilterService
  ) {}

  ngOnInit() {
    this.bookmarks.bookmarks$.subscribe((data) => {
      this.tableData = new MatTableDataSource(data);
      this.tableData.paginator = this.paginator;
    });

    this.filter.activeFilter$.subscribe((data) => {
      this.activeFilterValue = data;
      this.tableData.filter = data;
    });
  }

  public applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.setActiveFilter$(filterValue);
  }

  public clearFilter() {
    this.filter.setActiveFilter$('');
  }

  public editBookmark(bookmark: Bookmark) {
    this.bottomSheet.open(InputFormComponent, {
      data: {
        bookmark,
        type: 'Edit',
      },
    });
  }

  public deleteBookmark(bookmark: Bookmark) {
    this.bookmarks.deleteBookmark(bookmark._id);
  }
}
