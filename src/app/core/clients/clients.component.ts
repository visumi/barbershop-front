import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { DashboardService } from '../../services/dashboard.service'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  guid = '752dbb08-cb39-4941-8e91-b2f8d10383ed';

  clients = [];
  tableSpinner: boolean;
  selectedClient: {
    id: string,
    idBarberShop: string,
    name: string,
    nickname: string,
    phoneNumber: string
  };

  editForm: FormGroup;
  addForm: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loadClients();

    this.addForm = this.formBuilder.group({
      name: [{ value: '', disabled: false }, Validators.required],
      nickname: [{ value: '', disabled: false }, Validators.required],
      phoneNumber: [{ value: '', disabled: false }, Validators.required]
    });

    this.editForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      nickname: [{ value: '', disabled: true }, Validators.required],
      phoneNumber: [{ value: '', disabled: true }, Validators.required]
    });
  }

  private showToast(message, title, status): void { // Exibe o Toastr
    this.toastrService.show(message, title, { status, icon: 'bulb', iconPack: 'eva' });
  }

  private loadClients(): void {
    this.tableSpinner = true;
    const clientsAux = [];

    this.dashboardService.getClients(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach((client) => {
          clientsAux.push(res[client]);
        });
        this.tableSpinner = false;
      }, (error) => {
        console.log(error);
      }
    );
    this.clients = clientsAux;
  }

  public selectClient(client): void {
    this.selectedClient = client;
    this.editForm.get('name').enable();
    this.editForm.get('nickname').enable();
    this.editForm.get('phoneNumber').enable();
    this.editForm.patchValue({
      name: client.name,
      nickname: client.nickname,
      phoneNumber: client.phoneNumber
    });
  }

  public addClient(value): void {
    const body = {
      idBarberShop: this.guid,
      name: value.name,
      nickname: value.nickname,
      phoneNumber: value.phoneNumber
    };

    this.dashboardService.addClient(body).subscribe(
      () => {
        this.loadClients();
        this.showToast('Cliente adicionado', 'Sucesso', 'success');
        this.addForm.reset();
      }, () => {
        this.showToast('Problema ao criar cliente', 'Erro', 'danger');
      }
    );
  }

  public editClient(value): void {
    const body = {
      id: this.selectedClient.id,
      idBarberShop: this.guid,
      name: value.name,
      nickname: value.nickname,
      phoneNumber: value.phoneNumber
    };

    this.dashboardService.editClient(body).subscribe(
      () => {
        this.loadClients();
        this.showToast('Cliente atualizado', 'Sucesso', 'success');
      }, () => {
        this.showToast('Problema ao atualizar cliente', 'Erro', 'danger');
      }
    );
  }

  public deleteClient(client): void {
    this.dashboardService.deleteClient(this.guid, client.id).subscribe(
      () => {
        this.loadClients();
        this.showToast('Cliente removido', 'Sucesso', 'success');
        this.editForm.reset();
      }, () => {
        this.showToast('Problema ao remover cliente', 'Erro', 'danger');
      }
    );
  }

}
