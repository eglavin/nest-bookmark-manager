import { Component, OnInit } from '@angular/core';
import { MongodbService } from './_services/mongodb.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Data-Rep-Project';

  events: string[] = [];
  opened: boolean;
  public categoryDataSource: any = [];

  constructor(
    private mdbs: MongodbService
  ) { }

  ngOnInit() {
    this.mdbs.getCategoryData().subscribe(data => {
      this.categoryDataSource = data;
    });
  }

}
