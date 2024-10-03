import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = true;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token tồn tại:', token);
    } else {
      console.log('Token không tồn tại.');
    }
  }
  LogOut(){
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
