import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { email: 'mainguyenphuong04@gmail.com', password: '230304' } 
  ];

  login(email: string, password: string): string | null {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      return null; 
    }
    if (user.password === password) {
      return 'mock-token'; 
    }
    return null; 
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
