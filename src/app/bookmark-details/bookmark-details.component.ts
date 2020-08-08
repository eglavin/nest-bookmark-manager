import { Component, OnInit, ViewChild } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

// Imports Components
import { BookmarkAddComponent } from "../bookmark-add/bookmark-add.component";
import { BookmarkDetailsUpdateComponent } from "../bookmark-details-update/bookmark-details-update.component";

// Imports Services
import { MongodbService } from "../_services/mongodb.service";
import { CategoryService } from "../_services/category.service";

// Imports Data Model
import { Bookmark } from "../_models/bookmark.model";
import { Category } from "../_models/category.model";

@Component({
  selector: "app-bookmark-details",
  templateUrl: "./bookmark-details.component.html",
  styleUrls: ["./bookmark-details.component.scss"],
})
export class BookmarkDetailsComponent implements OnInit {
  constructor(
    private mdbs: MongodbService,
    private cat: CategoryService,
    private bottomSheet: MatBottomSheet
  ) {}

  // Variables
  bookmarksDataSource: Bookmark[];
  categoryDataSource: Category[];
  dataSource: any = [];
  category: String = "";

  // Initializes Table Title Names
  displayedColumns: string[] = [
    "title",
    "href",
    "description",
    "category",
    "options",
  ];

  // Paginator Init
  @ViewChild(MatPaginator) paginator: MatPaginator;

  addBookmark(): void {
    this.bottomSheet.open(BookmarkAddComponent);
  }

  edit(id: string): void {
    this.bottomSheet.open(BookmarkDetailsUpdateComponent, {
      data: {
        id: id,
      },
    });
  }

  delete(id: string) {
    this.mdbs.deleteBookmark(id).subscribe();
  }

  reload() {
    this.applyFilter("");
    this.mdbs.getBookmarkData().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.dataSource.paginator._pageIndex = 0;
  }

  // Filters Table
  applyFilter(filterValue: any) {
    this.category = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  removeFilter() {
    this.category = "";
    this.applyFilter("");
  }

  getData() {
    this.mdbs.getBookmarkData().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.mdbs.getCategoryData().subscribe((data) => {
      this.categoryDataSource = data;
    });
    this.cat.pickedcat.subscribe((message) => {
      this.category = message;
      this.applyFilter(this.category);
    });
  }

  ngOnInit() {
    this.getData();
  }
}
