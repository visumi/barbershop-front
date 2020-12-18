import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  spinnerLogin = false;
  alert = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userKey: '',
      password: ''
    });
  }

  onSubmit(data): void {
    this.spinnerLogin = true;
    this.loginService.loginAuth(data).subscribe(
      (res: {accessToken: string}) => {
        const decoded = jwt_decode(res.accessToken);
        localStorage.setItem('userInfo', JSON.stringify(decoded));
        localStorage.setItem('Token', res.accessToken);
        this.router.navigate(['dashboard']);
      }, (error) => {
        this.spinnerLogin = false;
        console.log(error);
        this.alert = true;
      }
    );
  }

  onClose(): void {
    this.alert = false;
  }
}
