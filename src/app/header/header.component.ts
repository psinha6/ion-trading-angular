import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    if (this.loginService.userValue.id) {
      this.loggedIn = true;
    }
    this.loginService.user.subscribe((data) => {
      if (data.id) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }

  onLogout() {
    this.loginService.logout();
  }

  getStatus() {
    return this.loginService.getStatus();
  }

  getStyleClass() {
    switch (this.loginService.getStatus()) {
      case 'Not Logged In':
        return 'text-info'
      case 'Logging In':
        return 'text-primary'
      case 'Logged In':
        return 'text-success';
      case 'Logging Out':
        return 'text-danger'
      case 'Logged Out':
        return 'text-dark';
        default: return 'text-info';
    }
  }

}
