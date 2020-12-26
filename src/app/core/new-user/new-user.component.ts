import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  guid = '752dbb08-cb39-4941-8e91-b2f8d10383ed'; // Guid da Barbearia Default

  users = [];
  selectedUser: any;
  newUserForm: FormGroup;
  editUserForm: FormGroup;
  userSpinner: boolean;
  role = 'Função';

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loadUsers();

    this.newUserForm = this.formBuilder.group({
      name: [{ value: '', disabled: false }, Validators.required],
      username: [{ value: '', disabled: false }, Validators.required],
      email: [{ value: '', disabled: false }, Validators.required],
      type: [{ value: '', disabled: false }, Validators.required]
    });

    this.editUserForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      type: [{ value: '', disabled: true }, Validators.required]
    });

  }

  private showToast(message, title, status): void { // Exibe o Toastr
    this.toastrService.show(message, title, { status, icon: 'bulb', iconPack: 'eva' });
  }

  private loadUsers(): void {
    this.userSpinner = true;
    const usersAux = [];
    this.dashboardService.getUsers(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach((user) => {
          usersAux.push(res[user]);
        });
        this.userSpinner = false;
      }, (error) => {
        console.log(error);
      }
    );
    this.users = usersAux;
  }

  public selectUser(user): void {
    console.log(user);
    this.selectedUser = user;
    this.editUserForm.enable();
    if (user.type === 1) {
      this.role = 'Administrador';
    } else if (user.type === 2) {
      this.role = 'Gerente';
    } else {
      this.role = 'Funcionário';
    }

    this.editUserForm.patchValue({
      name: user.name,
      username: user.username,
      email: user.email,
      type: user.type
    });
  }

  public addUser(data): void {
    data.idBarberShop = this.guid;
    this.dashboardService.addUser(data).subscribe(
      () => {
        this.showToast('Usuário adicionado', 'Sucesso', 'success');
        this.loadUsers();
      }, () => {
        this.showToast('Problema ao adicionar', 'Erro', 'danger');
      }
    );
  }

  public editUser(data): void {
    data.id = this.selectedUser.id;
    data.idBarberShop = this.guid;

    this.dashboardService.editUser(data).subscribe(
      () => {
        this.showToast('Usuário alterado', 'Sucesso', 'success');
        this.loadUsers();
      }, () => {
        this.showToast('Problema ao atualizar', 'Erro', 'danger');
      }
    );
  }

  public deleteUser(data): void {
    this.dashboardService.deleteUser(this.guid, data.id).subscribe(
      () => {
        this.showToast('Usuário deletado', 'Sucesso', 'success');
        this.loadUsers();
      }, () => {
        this.showToast('Problema ao deletar', 'Erro', 'danger');
      }
    );
  }

}
