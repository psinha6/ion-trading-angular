import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  form!: FormGroup;
  error: any;

  constructor(private loginService: LoginService, 
    private route: Router) {
      if (this.loginService.userValue && this.loginService.userValue.id) {
        this.route.navigate(['dashboard'])
      }
     }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(/^[^\^,.\/\\]*$/)]),
      'password': new FormControl('', [Validators.required])
    })
  }

  validatePattern(control: FormControl) {
    const forbiddenChars = ['\\', '/', ',', '.', '^'];
    console.log(control.value);
    if (forbiddenChars.indexOf(control.value) !== -1) {
      return {forbiddenChars: true};
    }
    return null;
  }

  onCancel() {
    this.loginService.toWelcome();
  }

  onSubmit() {
    console.log(this.form.value);
    this.loading = true;
    this.loginService.login(this.form.value.email, this.form.value.password)
    .subscribe((data) => {
      this.loading = false;
      this.route.navigate(['/dashboard'])
    }, error => {
      console.log(error);
      this.loading = false;
      this.error = error.errorMessage.message;
    })
  }
}
