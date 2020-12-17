import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  spinnerForgot = false;


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userKey: ''
    });
  }

  onSubmit(data): void {
    this.spinnerForgot = true;
    this.loginService.forgotAuth(data).subscribe(
      () => {
        this.spinnerForgot = false;
        this.showToast('E-mail enviado', 'Sucesso', 'success');
      }, () => {
        this.spinnerForgot = false;
        this.showToast('Falha ao enviar', 'Erro', 'danger');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['login']);
  }

  showToast(message, title, status): void {
    this.toastrService.show(message, title, { status, icon: 'email-outline', iconPack: 'eva' });
  }

}
