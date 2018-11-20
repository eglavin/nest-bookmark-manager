import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Imports Mongo DB Service
import { MongodbService } from '../_services/mongodb.service';

// Imports Data Model
import { Category } from '../_models/category.model';

@Component({
  selector: 'app-bookmark-add',
  templateUrl: './bookmark-add.component.html',
  styleUrls: ['./bookmark-add.component.scss']
})
export class BookmarkAddComponent implements OnInit {

  // Variables
  categoryDataSource: Category[];

  constructor(
    private router: Router,
    private mdbs: MongodbService,
  ) { }

  ngOnInit() {
    this.mdbs.getCategoryData().subscribe(data => {
      this.categoryDataSource = data;
    });
  }

  // Adds bookmark via service
  onAddBookmark(form: NgForm) {
    this.mdbs.addBookmark(form.value.title, form.value.href, form.value.description, form.value.category).subscribe(() => {
      this.router.navigate(['/?']);
    });
  }
  reload(): void {
    window.location.reload();
  }
}
