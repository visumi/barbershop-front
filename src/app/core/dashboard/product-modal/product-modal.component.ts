import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  @Input()
  public selecionar: (selecionado: string) => void;

  guid = '752dbb08-cb39-4941-8e91-b2f8d10383ed';
  selectProduct: FormGroup;
  selectService: FormGroup;
  services = [];
  products = [];

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadService();
    this.loadProducts();

    this.selectProduct = this.formBuilder.group({
      item: ['', Validators.required]
    });

    this.selectService = this.formBuilder.group({
      item: ['', Validators.required]
    });
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

  private loadProducts(): void {
    const productsAux = [];
    this.dashboardService.getProducts(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach((product) => {
          productsAux.push({
            id: res[product].id,
            name: res[product].name,
            price: res[product].price,
            type: 'product',
            qty: 1
          });
        });
      }, (error) => {
        console.log(error);
      }
    );
    this.products = productsAux;
  }

}
