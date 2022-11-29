import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { InputFormComponent } from '../input-form/input-form.component';
import { MongodbService } from '../_services/mongodb.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.scss'],
})
export class DetailsTableComponent implements OnInit {
  constructor(
    private db: MongodbService,
    private data: DataService,
    private bottomSheet: MatBottomSheet
  ) {}

  @ViewChild(MatPaginator)
  paginator: MatPaginator | undefined;

  displayedColumns: string[] = [
    'title',
    'href',
    'description',
    'category',
    'options',
  ];
  filterValue: string = '';
  tableData: any = [];

  editBookmark = (id: string) => {
    this.bottomSheet.open(InputFormComponent, {
      data: { id: id, type: 'Edit' },
    });
  };

  deleteBookmark = async (id: string) => {
    await this.db.deleteBookmark(id).subscribe(() => {
      this.db.getBookmarkData().subscribe((data) => {
        this.data.updateBookmarks(data);
        this.data.setUpdate(true);
      });
    });
  };

  setTableData = (data: any) => {
    this.tableData = new MatTableDataSource(data);
    this.tableData.paginator = this.paginator;
  };

  setFilterValue = (value: string) => {
    this.filterValue = value;
    this.tableData.filter = value;
  };

  applyFilter = (event: KeyboardEvent) => {
    const filterValue = (event.target as HTMLInputElement).value;

    this.setFilterValue(filterValue);
  };

  clearFilter = () => {
    this.setFilterValue('');
  };

  reloadData = (state: boolean) => {
    if (state) {
      this.setFilterValue('');
      this.data.setUpdate(false);

      // this.tableData.paginator._pageIndex = 0;
      this.data.bookmarks.subscribe((data) => {
        this.setTableData(data);
      });
    }
  };

  ngOnInit() {
    this.data.bookmarks.subscribe((data) => {
      this.setTableData(data);
    });

    this.data.activeFilter.subscribe((data) => {
      this.setFilterValue(data);
    });

    this.data.updateData.subscribe((state) => {
      this.reloadData(state);
    });
  }
}
