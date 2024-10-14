import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-home',
  standalone: true,
  imports: [],
  templateUrl: './welcome-home.component.html',
  styleUrl: './welcome-home.component.scss'
})
export class WelcomeHomeComponent {
  constructor(private authService: AuthService, private router:Router) {}
  LogOut(){
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
