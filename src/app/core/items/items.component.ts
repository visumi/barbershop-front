import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ItemsService } from 'src/app/services/items.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  guid = '752dbb08-cb39-4941-8e91-b2f8d10383ed'; // Guid da Barbearia Default

  addProductForm: FormGroup;
  editProductForm: FormGroup;
  addServiceForm: FormGroup;
  editServiceForm: FormGroup;
  disableEditForm = true;
  disableEditFormService = true;
  tableSpinner: boolean;
  tableServiceSpinner: boolean;

  products = [];
  services = [];
  selectedProduct: any;
  selectedService: any;

  constructor(
    private itemsService: ItemsService,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadService();

    this.addProductForm = this.formBuilder.group({
      name: [{ value: '', disabled: false }, Validators.required],
      price: [{ value: '', disabled: false }, Validators.required],
      stockQuantity: [{ value: '', disabled: false }, Validators.required]
    });
    this.editProductForm = this.formBuilder.group({
      name: [{ value: '', disabled: this.disableEditForm }, Validators.required],
      price: [{ value: '', disabled: this.disableEditForm }, Validators.required],
      stockQuantity: [{ value: '', disabled: this.disableEditForm }, Validators.required]
    });

    this.addServiceForm = this.formBuilder.group({
      name: [{ value: '', disabled: false }, Validators.required],
      price: [{ value: '', disabled: false }, Validators.required]
    });
    this.editServiceForm = this.formBuilder.group({
      name: [{ value: '', disabled: this.disableEditFormService }, Validators.required],
      price: [{ value: '', disabled: this.disableEditFormService }, Validators.required]
    });
  }

  private showToast(message, title, status): void { // Exibe o Toastr
    this.toastrService.show(message, title, { status, icon: 'bulb', iconPack: 'eva' });
  }

  private loadProducts(): void {
    this.tableSpinner = true;
    const productsAux = [];
    this.dashboardService.getProducts(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach((product) => {
          productsAux.push(res[product]);
        });
        this.tableSpinner = false;
      }, (error) => {
        console.log(error);
      }
    );
    this.products = productsAux;
  }

  private loadService(): void {
    const servicesAux = [];
    this.dashboardService.getServices(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach((service) => {
          servicesAux.push({
            id: res[service].id,
            name: res[service].name,
            price: res[service].price,
            type: 'service',
            qty: 1
          });
        });
      }, (error) => {
        console.log(error);
      }
    );
    this.services = servicesAux;
  }

  public addProduct(product): void {
    this.tableSpinner = true;
    const body = {
      idBarberShop: this.guid,
      name: product.name,
      price: product.price,
      stockQuantity: product.stockQuantity
    };
    this.itemsService.addProduct(body).subscribe(
      () => {
        this.loadProducts();
        this.showToast('Produto adicionado', 'Sucesso', 'success');
        this.tableSpinner = false;
      }, () => {
        this.tableSpinner = false;
        this.showToast('Problema ao criar', 'Erro', 'danger');
      }
    );
  }

  public addService(service): void {
    this.tableServiceSpinner = true;
    const body = {
      idBarberShop: this.guid,
      name: service.name,
      price: service.price
    };

    this.itemsService.addService(body).subscribe(
      () => {
        this.loadService();
        this.showToast('Serviço adicionado', 'Sucesso', 'success');
        this.tableServiceSpinner = false;
      }, () => {
        this.tableServiceSpinner = false;
        this.showToast('Problema ao criar', 'Erro', 'danger');
      }
    );
  }

  public selectProduct(product): void {
    this.selectedProduct = product;
    this.editProductForm.enable();
    this.editProductForm.patchValue({
      name: product.name,
      price: product.price,
      stockQuantity: product.stockQuantity
    });
  }

  public selectService(service): void  {
    this.selectedService = service;
    this.editServiceForm.enable();
    this.editServiceForm.patchValue({
      name: service.name,
      price: service.price
    });
  }

  public editProduct(product): void {
    this.tableSpinner = true;
    const body = {
      id: this.selectedProduct.id,
      idBarberShop: this.guid,
      name: product.name,
      price: product.price,
      stockQuantity: product.stockQuantity
    };

    this.itemsService.editProduct(body).subscribe(
      () => {
        this.loadProducts();
        this.showToast('Produto alterado', 'Sucesso', 'success');
        this.tableSpinner = false;
      }, () => {
        this.tableSpinner = false;
        this.showToast('Problema ao editar', 'Erro', 'danger');
      }
    );
  }

  public editService(service): void {
    this.tableServiceSpinner = true;
    const body = {
      id: this.selectedService.id,
      idBarberShop: this.guid,
      name: service.name,
      price: service.price
    };

    this.itemsService.editService(body).subscribe(
      () => {
        this.loadService();
        this.showToast('Serviço alterado', 'Sucesso', 'success');
        this.tableServiceSpinner = false;
      }, () => {
        this.tableServiceSpinner = false;
        this.showToast('Problema ao editar', 'Erro', 'danger');
      }
    );
  }

  public deleteProduct(product): void {
    this.tableSpinner = true;
    this.itemsService.deleteProduct(this.guid, product.id).subscribe(
      () => {
        this.loadProducts();
        this.showToast('Produto excluído', 'Sucesso', 'success');
        this.tableSpinner = false;
        this.editProductForm.reset();
        this.editProductForm.disable();
      }, () => {
        this.tableSpinner = false;
        this.showToast('Problema ao deletar', 'Erro', 'danger');
      }
    );
  }

  public deleteService(service): void {
    this.tableServiceSpinner = true;
    this.itemsService.deleteService(this.guid, service.id).subscribe(
      () => {
        this.loadService();
        this.showToast('Serviço excluído', 'Sucesso', 'success');
        this.tableServiceSpinner = false;
        this.editServiceForm.reset();
        this.editServiceForm.disable();
      }, () => {
        this.tableServiceSpinner = false;
        this.showToast('Problema ao deletar', 'Erro', 'danger');
      }
    );
  }
}
