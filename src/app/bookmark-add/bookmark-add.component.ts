import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

// Imports Mongo DB Service
import { MongodbService } from "../_services/mongodb.service";

@Component({
  selector: "app-bookmark-add",
  templateUrl: "./bookmark-add.component.html",
  styleUrls: ["./bookmark-add.component.scss"],
})
export class BookmarkAddComponent implements OnInit {
  // Variables
  categoryDataSource: any[];
  catname: string[];
  constructor(private mdbs: MongodbService) {}

  ngOnInit() {
    this.mdbs.getCategoryData().subscribe((data) => {
      this.categoryDataSource = data;
    });
  }

  // Adds bookmark via service
  onAddBookmark(form: NgForm) {
    const catname = this.categoryDataSource.find(
      (x) => x._id === form.value.category
    ).name;
    this.mdbs
      .addBookmark(
        form.value.title,
        form.value.href,
        form.value.description,
        form.value.category,
        catname
      )
      .subscribe(() => {});
  }
}
