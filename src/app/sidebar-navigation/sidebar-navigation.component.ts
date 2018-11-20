import { Component, OnInit } from '@angular/core';

// Imports Mongo DB Service
import { MongodbService } from '../_services/mongodb.service';

// Imports Data Model
import { Category } from '../_models/category.model';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss']
})
export class SidebarNavigationComponent implements OnInit {

  public categoryDataSource: Category[];

  constructor(
    private mdbs: MongodbService
  ) { }

  ngOnInit() {
    this.mdbs.getCategoryData().subscribe(data => {
      this.categoryDataSource = data;
    });
  }

}
