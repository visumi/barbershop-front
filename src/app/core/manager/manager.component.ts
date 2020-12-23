import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faDollarSign, faUsers, faCut, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  guid = '752dbb08-cb39-4941-8e91-b2f8d10383ed'; // Guid da Barbearia Default

  // Icons
  faCoffee = faDollarSign;
  faUsers = faUsers;
  faCut = faCut;
  faBoxes = faBoxes;

  sales = [];
  products = ['Vazio'];
  services = ['Vazio'];
  tableSpinner: boolean;

  dataForm: FormGroup;

  totalValue = 0;
  totalValueSpinner: boolean;
  totalProd = 0;
  totalProdSpinner: boolean;
  totalServices = 0;
  totalServicesSpinner: boolean;
  totalClients = 0;
  totalClientsSpinner: boolean;

  constructor(
    private itemService: ItemsService,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      client: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }]
    });

    this.totalValueSpinner = true;
    this.tableSpinner = true;
    const salesAux = [];
    this.getProdData();
    this.getServiceData();
    this.getClientData();

    this.itemService.getSales(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach((sale) => {
          salesAux.push(res[sale]);
          this.totalValue += res[sale].totalPrice;
        });
        this.sales = salesAux;
        this.totalValueSpinner = false;
        this.tableSpinner = false;
      }, (error) => {
        console.log(error);
      }
    );
  }

  public selectSale(sale): void {
    const products = [];
    const services = [];
    console.log(sale);
    sale.products.forEach((product) => {
      products.push(product.name);
    });

    sale.services.forEach((service) => {
      services.push(service.name);
    });

    this.products = products.length > 0 ? products : ['Vazio'];
    this.services = services.length > 0 ? services : ['Vazio'];

    this.dataForm.patchValue({
      client: sale.schedule ? sale.schedule.client : 'Venda Avulsa',
      phone: sale.schedule ? sale.schedule.clientPhoneNumber : 'Vazio'
    });
  }

  private getProdData(): void {
    this.totalProdSpinner = true;
    this.dashboardService.getProducts(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach(() => {
          this.totalProd ++;
        });
        this.totalProdSpinner = false;
      }, (error) => {
        console.log(error);
      }
    );
  }

  private getServiceData(): void {
    this.totalServicesSpinner = true;
    this.dashboardService.getServices(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach(() => {
          this.totalServices ++;
        });
        this.totalServicesSpinner = false;
      }, (error) => {
        console.log(error);
      }
    );
  }

  private getClientData(): void {
    this.totalClientsSpinner = true;
    this.dashboardService.getClients(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach(() => {
          this.totalClients ++;
        });
        this.totalClientsSpinner = false;
      }, (error) => {
        console.log(error);
      }
    );
  }

}
