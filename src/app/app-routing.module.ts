import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Components
import { BookmarkDetailsComponent } from "./bookmark-details/bookmark-details.component";
import { BookmarkAddComponent } from "./bookmark-add/bookmark-add.component";
import { BookmarkDetailsUpdateComponent } from "./bookmark-details-update/bookmark-details-update.component";

const routes: Routes = [
  {
    path: "",
    component: BookmarkDetailsComponent,
    pathMatch: "full",
  },
  {
    path: "add",
    component: BookmarkAddComponent,
    pathMatch: "full",
  },
  {
    path: "edit",
    component: BookmarkDetailsUpdateComponent,
    pathMatch: "full",
  },
  {
    path: "**",
    component: BookmarkDetailsComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
