import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [{ email: 'bep23@gmail.com', password: '230304' }];

  login(email: string, password: string): string | null {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      return null;
    }
    if (user.password === password) {
      const token = 'mock-token';
      localStorage.setItem('token', token);
      return token;
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
