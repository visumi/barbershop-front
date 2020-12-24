import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  guid = '752dbb08-cb39-4941-8e91-b2f8d10383ed'; // Guid da Barbearia Default

  constructor() { }

  ngOnInit(): void {
  }

}
