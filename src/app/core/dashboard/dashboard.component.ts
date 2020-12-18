import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  services: any[];
  clients: any[];

  selectedService: string;
  guid = '752dbb08-cb39-4941-8e91-b2f8d10383ed';
  avulso = false;
  dateButton = true;
  clearButton = true;
  newBooking: FormGroup;
  date = new Date();
  today = new Date();
  selectedBook: {
    date: string,
    client: string,
    time: string
  } = {
    date: '00/00/0000',
    client: '',
    time: '00:00'
  };

  bookings = [
    {
      date: '12/2/2020',
      client: 'Testificate1',
      time: '13:00'
    },
    {
      date: '13/3/2020',
      client: 'Testificate2',
      time: '14:00'
    },
    {
      date: '13/3/2020',
      client: 'Testificate3',
      time: '15:00'
    }
  ];

  cart = [
    {
      id: '1',
      nome: 'Pomada para cabelo',
      qty: 1
    },
    {
      id: '2',
      nome: 'Corte de Cabelo',
      qty: 2
    },
    {
      id: '3',
      nome: 'Corte de Barba',
      qty: 3
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getClients();
    this.getServices();

    this.newBooking = this.formBuilder.group({
      idService: '',
      idClient: '',
      scheduledAt: '',
      time: ''
    });
  }

  private getClients(): void {
    const clientsAux = [];
    this.dashboardService.getClients(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach((client) => {
          clientsAux.push({
            id: res[client].id,
            name: res[client].name
          });
        });
      }, (error) => {
        console.log(error);
      }
    );
    this.clients = clientsAux;
  }

  private getServices(): void {
    const servicesAux = [];
    this.dashboardService.getServices(this.guid).subscribe(
      (res) => {
        Object.keys(res).forEach((service) => {
          servicesAux.push({
            id: res[service].id,
            name: res[service].name
          });
        });
      }, (error) => {
        console.log(error);
      }
    );
    this.services = servicesAux;
  }

  public handleDateChange(selectedDate): void {
    this.date = selectedDate;
    const convertedDate = this.date.toISOString().split('T')[0];

    if (selectedDate < this.today) {
      this.dateButton = true;
    } else {
      this.newBooking.setValue({ idClient: '', scheduledAt: convertedDate, idService: '', time: '' });
      this.dateButton = false;
    }
  }

  public createSchedule(data): void {
    const book = {
      idBarberShop: this.guid,
      idService: data.idService,
      idClient: data.idClient,
      scheduledAt:  data.scheduledAt + 'T' + data.time + ':00.000Z'
    };

    this.dashboardService.addSchedule(book).subscribe(
      (res) => {
        console.log(res);
      }, (error) => {
        console.log(error);
       }
    );
  }

  public checkBook(book): void {
    this.selectedBook = book;
  }

  public teste(): void {
    this.clearButton = false;
    const item = {
      id: '3',
      nome: 'teste',
      qty: 1
    };
    const itemFound = this.cart.find(cartitem => cartitem.id === item.id);
    if (itemFound) {
      itemFound.qty++;
    } else {
      this.cart.push(item);
    }
  }

  public removeItem(item): void {
    const itemFound = this.cart.find(cartItem => cartItem.id === item.id);
    if (itemFound.qty > 1) {
      itemFound.qty--;
    } else {
      const index = this.cart.indexOf(itemFound);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    }
    console.log(this.cart);
  }

  public clearCart(): void {
    this.cart = [];
    this.clearButton = true;
  }

  public avulsoToggle(): void {
    this.avulso = !this.avulso;
    if (this.avulso === true) {
      this.selectedBook = {
        date: '14/12/2020',
        client: '',
        time: '12:00'
      };
    } else {
      this.selectedBook = {
        date: '00/00/0000',
        client: '',
        time: '00:00'
      };
    }
  }
}
