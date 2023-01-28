import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, interval, timeout, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;
  private status: string = 'Not Logged In';

  constructor(private http: HttpClient, private router: Router) {
    const userData = localStorage.getItem('user') || '{}';
    this.userSubject = new BehaviorSubject<User>(JSON.parse(userData));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }
  login(username: string, password: string) {
    this.status = 'Logging In';
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(
        timeout({
          each: 5000,
          with: () => throwError({ errorMessage: { message: 'Request timed out' } })
        }),
        map(user => {
          this.status = 'Logged In';
          localStorage.setItem('user', JSON.stringify(user.user));
          this.userSubject.next(user.user);
          return user.user;
        }));
  }

  logout() {
    this.status = 'Logging Out';
    localStorage.removeItem('user');
    this.userSubject.next(new User());
    this.router.navigate(['/login']);
    this.status = 'Logged Out';
  }

  getStatus() {
    return this.status;
  }

  toWelcome() {
    this.status = 'Not Logged In';
    this.router.navigate(['/']);
  }
}
