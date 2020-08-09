// Angular Imports
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Material Imports
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

// App Routing & Services
import { AppRoutingModule } from "./app-routing.module";
import { MongodbService } from "./_services/mongodb.service";
import { DataService } from "./_services/data.service";

// Component Imports
import { AppComponent } from "./app.component";
import { DetailsTableComponent } from "./details-table/details-table.component";
import { InputFormComponent } from "./input-form/input-form.component";
import { SidebarNavigationComponent } from "./sidebar-navigation.component";

@NgModule({
  declarations: [
    AppComponent,
    DetailsTableComponent,
    InputFormComponent,
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
  providers: [MongodbService, DataService],
  entryComponents: [InputFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
