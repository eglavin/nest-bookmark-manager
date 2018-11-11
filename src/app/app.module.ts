import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule,
  MatListModule,
  MatRippleModule,
  MatCardModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookmarkDetailsComponent } from './bookmark-details/bookmark-details.component';
import { BookmarkDetailsUpdateComponent } from './bookmark-details-update/bookmark-details-update.component';
import { BookmarkAddComponent } from './bookmark-add/bookmark-add.component';
import { MongodbService } from './_services/mongodb.service';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkDetailsComponent,
    BookmarkDetailsUpdateComponent,
    BookmarkAddComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatListModule,
    MatRippleModule,
    MatCardModule
  ],
  exports: [

  ],
  providers: [
    MongodbService,

  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
