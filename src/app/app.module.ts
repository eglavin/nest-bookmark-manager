// Angular Imports
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";

// Component Imports
import { AppComponent } from "./app.component";
import { BookmarkDetailsComponent } from "./bookmark-details/bookmark-details.component";
import { BookmarkDetailsUpdateComponent } from "./bookmark-details-update/bookmark-details-update.component";
import { BookmarkAddComponent } from "./bookmark-add/bookmark-add.component";
import { SidebarNavigationComponent } from "./sidebar-navigation/sidebar-navigation.component";

// App Routing
import { AppRoutingModule } from "./app-routing.module";

// Services
import { MongodbService } from "./_services/mongodb.service";
import { CategoryService } from "./_services/category.service";

@NgModule({
  declarations: [
    AppComponent,
    BookmarkDetailsComponent,
    BookmarkDetailsUpdateComponent,
    BookmarkAddComponent,
    SidebarNavigationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatListModule,
    MatRippleModule,
    MatCardModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatPaginatorModule,
  ],
  providers: [MongodbService, CategoryService],
  entryComponents: [BookmarkAddComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
