import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userKey: ''
    });
  }

  onSubmit(data): void {
    this.loginService.forgotAuth(data).subscribe(
      (res) => {
        console.log(res);
      }, (error) => {
        console.log(error);
      }
    );
  }
}
