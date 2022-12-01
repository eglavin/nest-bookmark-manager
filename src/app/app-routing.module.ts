import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BookmarksTableComponent } from './components/bookmarks-table/bookmarks-table.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        title: 'Nest Bookmark Manager',
        component: BookmarksTableComponent,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
