import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsTableComponent } from './details-table/details-table.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsTableComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
