import { Component, OnInit } from '@angular/core';

// Imports Mongo DB Service
import { MongodbService } from '../_services/mongodb.service';
import { category } from '../_services/category.service';

// Imports Data Model
import { Category } from '../_models/category.model';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss']
})
export class SidebarNavigationComponent implements OnInit {

  public categoryDataSource: Category[];
  category : string = "";

  constructor(
    private mdbs: MongodbService,
    private cat: category,
  ) { }

  ngOnInit() {
    this.mdbs.getCategoryData().subscribe(data => {
      this.categoryDataSource = data;
    });
    this.cat.pickedcat.subscribe(message => this.category = message)
  }


  filter(category: string){
    console.log(category);
    this.cat.changeCategory(category);
  }
}
