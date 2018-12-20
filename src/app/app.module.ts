import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalComponent } from './components/rental/rental.component';
import { TempComponent } from './components/temp/temp.component';
import { RentalListComponent } from './components/rental/rental-list/rental-list.component';
import { RentalListItemComponent } from './components/rental/rental-list-item/rental-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RentalComponent,
    TempComponent,
    RentalListComponent,
    RentalListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
