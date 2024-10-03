import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'home', component:HomeComponent, canActivate: [AuthGuard]}
];
