import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';
import { HttpClientModule  , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthComponent } from './auth.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptor } from './shared/token.interceptor';

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent , canActivate: [AuthGuard] },
      { path: ":register", component: RegisterComponent , canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [LoginComponent , RegisterComponent, AuthComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes), HttpClientModule , NgPipesModule , ReactiveFormsModule
  ],
  providers: [AuthService , AuthGuard , {provide: HTTP_INTERCEPTORS , useClass: TokenInterceptor , multi: true}]
})
export class AuthModule { }
