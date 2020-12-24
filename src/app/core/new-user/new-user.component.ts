import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  guid = '752dbb08-cb39-4941-8e91-b2f8d10383ed'; // Guid da Barbearia Default

  users = [];

  constructor(private dashboardService: DashboardService ) { }

  ngOnInit(): void {
    this.loadUsers();
    console.log(this.users);
  }

  private loadUsers(): void {
    const usersAux = [];
    this.dashboardService.getUsers(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach((user) => {
          usersAux.push(res[user]);
        });
      }, (error) => {
        console.log(error);
      }
    );
    this.users = usersAux;
  }

}
