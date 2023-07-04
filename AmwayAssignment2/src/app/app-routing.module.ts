import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterComponent
  },
  {
    path:'registerSuccess',
    component: RegisterSuccessComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'loginSuccess',
    component: LoginSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
