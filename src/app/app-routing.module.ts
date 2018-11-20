import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { BookmarkDetailsComponent } from './bookmark-details/bookmark-details.component';
import { BookmarkAddComponent } from './bookmark-add/bookmark-add.component';
import { BookmarkDetailsUpdateComponent } from './bookmark-details-update/bookmark-details-update.component';
const routes: Routes = [
  // { path: '', component: AppComponent },
  { path: '', component: BookmarkDetailsComponent },
  { path: 'add', component: BookmarkAddComponent },
  { path: 'edit:id', component: BookmarkDetailsUpdateComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
