import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-change-form',
  templateUrl: './change-form.component.html',
  styleUrls: ['./change-form.component.scss']
})
export class ChangeFormComponent implements OnInit {

  currentForm: string;
  changeForm: FormGroup;
  alert = false;
  spinnerChange = false;
  verification: string;
  verIcon: string;
  grantType: string;
  fieldType: string;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.currentForm = this.activatedRoute.snapshot.routeConfig.path;

    if (this.currentForm === 'code') {
      this.verification = 'Código';
      this.verIcon = 'shield';
      this.grantType = 'verification_code';
      this.fieldType = 'text';
    } else {
      this.verification = 'Senha Antiga';
      this.verIcon = 'lock';
      this.grantType = 'old_password';
      this.fieldType = 'password';
    }

    this.changeForm = this.formBuilder.group({
      userKey: '',
      newPassword: '',
      grantType: '',
      verification: ''
    });
  }

  onSubmit(data): void {
    data.grantType = this.grantType;
    this.spinnerChange = true;

    if (!data.userKey || !data.newPassword || !data.verification) {
      this.spinnerChange = false;
      this.message = 'Preencha todos os campos';
      this.alert = true;
    } else {
      this.loginService.changeAuth(data).subscribe(
        (res) => {
          this.spinnerChange = false;
          console.log(res);
        }, () => {
          this.spinnerChange = false;
          this.message = 'Erro no servidor';
          this.alert = true;
        }
      );
    }
  }

  onClose(): void {
    this.alert = false;
  }

}
