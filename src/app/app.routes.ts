import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeHomeComponent } from './components/welcome-home/welcome-home.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'welcomeHome', component:WelcomeHomeComponent, canActivate: [AuthGuard]},
    {path: 'home', component:HomeComponent, canActivate: [AuthGuard]},
    {path: 'result', component:ResultComponent, canActivate: [AuthGuard]}
];
