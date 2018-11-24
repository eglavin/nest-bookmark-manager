import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
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
  MatPaginatorModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { BookmarkDetailsComponent } from './bookmark-details/bookmark-details.component';
import { BookmarkDetailsUpdateComponent } from './bookmark-details-update/bookmark-details-update.component';
import { BookmarkAddComponent } from './bookmark-add/bookmark-add.component';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';

import { AppRoutingModule } from './app-routing.module';

import { MongodbService } from './_services/mongodb.service';

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
    MatPaginatorModule
  ],
  providers: [
    MongodbService,
  ],
  entryComponents: [
    BookmarkAddComponent
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
