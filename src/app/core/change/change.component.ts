import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  changeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      userKey: '',
      newPassword: '',
      grantType: '',
      verification: ''
    });
  }

  onSubmit(data): void {
    console.log(data);
  }

  onClose(): void {
    console.log('close');
  }

}
