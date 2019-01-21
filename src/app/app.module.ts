import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalModule } from './components/rental/rental.module';
import { AuthModule } from './auth/auth.module';
import { ManageModule } from './components/manage/manage.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RentalModule,
    AuthModule,
    NgbModule,
    ManageModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
