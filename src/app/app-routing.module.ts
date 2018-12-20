import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalComponent } from './components/rental/rental.component';
import { TempComponent } from './components/temp/temp.component';

const routes: Routes = [
  {path: '', component: RentalComponent},
  {path: 'temp', component: TempComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
