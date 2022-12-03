import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';

import { BookmarksService } from './services/bookmark.service';
import { CategoryService } from './services/category.service';

import { AppComponent } from './app.component';
import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { BookmarksTableComponent } from './components/bookmarks-table/bookmarks-table.component';
import { InputFormComponent } from './components/input-form/input-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AppToolbarComponent,
    SidebarNavigationComponent,
    BookmarksTableComponent,
    InputFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
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
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatPaginatorModule,
  ],
  providers: [BookmarksService, CategoryService],
  entryComponents: [InputFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
