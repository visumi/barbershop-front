import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProductModalComponent } from './product-modal/product-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  guid = '752dbb08-cb39-4941-8e91-b2f8d10383ed'; // Guid da Barbearia Default

  // Arrays de dados
  services: any[];
  clients: any[];
  bookings = [];
  cart = [];
  totalPrice = 0;

  // Variáveis de controle
  scheduleButton = true; // Controla o botão de Reserva
  scheduleSpinner = false; // Spinner do botao de Reservar
  avulsoToggle = false; // Identifica se a venda é avulsa ou não
  scheduleCardSpinner = false; // Spinner do card das Reservas
  deleteButton = true; // Controla o botão de Excluir Reserva
  emptySchedule = true; // Controla se há reservas no dia
  finishSaleButton = true; // Controla o botão de Finalizar
  cartCardSpinner = false; // Controla o spinner do carrinho
  finishSpinner = false; // Spinner do botao de Finalizar

  // Form
  newBooking: FormGroup; // Cria o form de Nova Reserva
  // Dados úteis
  date: Date; // Data que será alterada
  today = new Date(); // Data que será usada como parâmetro
  loadSchedulesDate: string; // Data atual selecionada no calendar no formato ISO

  selectedBook: { // Salva qual a Reserva está selecionada no momento, ao iniciar será o valor Default
    client: string,
    id: string,
    scheduledAt: string,
    time: string,
    service: string,
    idService: string
  } = {
      client: '',
      id: '',
      scheduledAt: '',
      time: '',
      service: '',
      idService: ''
    };

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private toastrService: NbToastrService,
    private windowService: NbWindowService
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('Token'));
    // Carrega os arrays
    this.getClients();
    this.getServices();

    // Cria o formulário
    this.newBooking = this.formBuilder.group({
      idService: '',
      idClient: '',
      scheduledAt: '',
      time: ''
    });
  }

  private showToast(message, title, status): void { // Exibe o Toastr
    this.toastrService.show(message, title, { status, icon: 'bulb', iconPack: 'eva' });
  }

  private getClients(): void { // Carrega os clientes
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

  private getServices(): void { // Carrega os serviços
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

  private loadSchedules(date): void { // Carrega as Reservas do banco
    this.scheduleCardSpinner = true;
    const bookingsAux = [];
    this.dashboardService.getSchedules(this.guid, date).subscribe(
      (res) => {
        this.scheduleCardSpinner = false;
        this.emptySchedule = false;
        if (Object.keys(res).length === 0) {
          this.emptySchedule = true;
        }
        Object.keys(res).forEach((book) => {
          const rawData = res[book].scheduledAt;
          const modData = [];
          const bookDate = rawData.split('T')[0];
          modData.push(rawData.split('T')[1].split('Z')[0].split(':'));
          modData[0].splice(2, 1);
          const bookHour = modData[0].join(':');

          bookingsAux.push({
            client: res[book].client,
            id: res[book].id,
            scheduledAt: bookDate,
            time: bookHour,
            service: res[book].service,
            idService: res[book].idService
          });
        });
      }, () => {
        this.scheduleCardSpinner = false;
        this.showToast('Problema ao carregar Reservas', 'Erro', 'danger');
      }
    );
    this.bookings = bookingsAux;
  }

  public deleteSchedule(): void { // Deleta uma reserva
    this.dashboardService.deleteSchedule(this.guid, this.selectedBook.id).subscribe(
      () => {
        this.showToast('Reserva excluída', 'Sucesso', 'success');
        this.loadSchedules(this.loadSchedulesDate);
        this.selectedBook = {
          client: '',
          id: '',
          scheduledAt: '',
          time: '',
          service: '',
          idService: ''
        };
        this.cart = [];
        this.totalPrice = 0;
      }, () => {
        this.showToast('Problema ao deletar Reserva', 'Erro', 'danger');
      }
    );
  }

  public handleDateChange(selectedDate): void { // Converte a data para o formulário da Nova Reserva e controla o botão
    this.date = selectedDate;
    this.loadSchedulesDate = selectedDate.toISOString();

    const convertedDate = this.date.toISOString().split('T')[0];
    this.loadSchedules(this.loadSchedulesDate);
    if (selectedDate < this.today) { // Se a data for menor que o dia atual, trava o botão
      this.scheduleButton = true;
    } else {
      this.newBooking.setValue({ idClient: '', scheduledAt: convertedDate, idService: '', time: '' }); // Preenche o formulário com a data
      this.scheduleButton = false;
    }
  }

  public createSchedule(data): void { // Cria uma reserva
    this.scheduleSpinner = true;
    const book = {
      idBarberShop: this.guid,
      idService: data.idService,
      idClient: data.idClient,
      scheduledAt: data.scheduledAt + 'T' + data.time + ':00.000Z'
    };

    this.dashboardService.addSchedule(book).subscribe(
      () => {
        this.scheduleSpinner = false;
        this.showToast('Reserva criada', 'Sucesso', 'success');
        this.loadSchedules(data.scheduledAt + 'T' + data.time + ':00.000Z');
      }, () => {
        this.scheduleSpinner = false;
        this.showToast('Problema ao criar Reserva', 'Erro', 'danger');
      }
    );
  }

  public selectBook(book): void { // Modifica qual a Reserva está selecionada no momento
    this.cart = [];
    this.totalPrice = 0;
    this.deleteButton = false;
    this.selectedBook = book;
    this.dashboardService.getService(this.guid, this.selectedBook.idService).subscribe(
      (res: any) => {
        this.cart.push({
          id: res.id,
          name: res.name,
          price: res.price,
          qty: 1,
          type: 'service'
        });
        this.addTotal(res.price);
        this.finishSaleButton = false;
        this.cartCardSpinner = false;
      }, (error) => {
        console.log(error);
      }
    );
  }

  public changeAvulso(): void { // Muda os dados da Reserva selecionada de acordo com o Toggle
    this.deleteButton = true;
    this.avulsoToggle = !this.avulsoToggle;
    const formatedDate = this.today.toISOString().split('T')[0];
    if (this.avulsoToggle === true) {
      this.selectedBook = { // Aqui a venda é avulsa, precisa pegar data e tempo do momento do toggle
        client: '',
        id: '',
        scheduledAt: formatedDate,
        time: this.today.getHours() + ':' + this.today.getMinutes(),
        service: '',
        idService: ''
      };
    } else {
      this.cart = [];
      this.totalPrice = 0;
      this.selectedBook = {
        client: '',
        id: '',
        scheduledAt: '',
        time: '',
        service: '',
        idService: ''
      };
    }
  }

  public openWindow(): void { // Abre o modal dos produtos
    this.windowService.open(ProductModalComponent, {
      title: `Selecione`,
      context: {
        selecionar: (selecionado) => {
          const itemFound = this.cart.find(cartitem => cartitem.id === selecionado.item.id);
          if (itemFound) {
            itemFound.qty++;
            this.addTotal(itemFound.price);
            this.finishSaleButton = false;
          } else {
            this.cart.push(selecionado.item);
            this.addTotal(selecionado.item.price);
            this.finishSaleButton = false;
          }
        }
      }
    });
  }

  public removeItem(item): void { // Remove um item do carrinho
    const itemFound = this.cart.find(cartItem => cartItem.id === item.id);
    if (itemFound.qty > 1) {
      itemFound.qty--;
      this.removeTotal(itemFound.price);
    } else {
      const index = this.cart.indexOf(itemFound);
      if (index > -1) {
        this.removeTotal(itemFound.price);
        this.cart.splice(index, 1);
      }
    }
    if (this.cart.length === 0) {
      this.finishSaleButton = true;
      this.totalPrice = 0;
    }
  }

  private addTotal(price: number): void { // Soma no valor total
    this.totalPrice += price;
  }

  private removeTotal(price: number): void { // Remove do valor total
    this.totalPrice -= price;
  }

  public clearCart(): void { // Limpa o carrinho
    this.cart = [];
    this.finishSaleButton = true;
    this.totalPrice = 0;
  }

  public finishSale(): void { // Finaliza a venda
    this.finishSpinner = true;
    const products = [];
    const services = [];

    Object.keys(this.cart).forEach((item) => {
      if (this.cart[item].type === 'product') {
        products.push({
          id: this.cart[item].id,
          quantity: this.cart[item].qty
        });
      } else {
        services.push(
          this.cart[item].id
        );
      }
    });

    const finalObject = {
      idBarberShop: this.guid,
      idSchedule: this.selectedBook.id,
      totalPrice: this.totalPrice,
      products,
      services
    };

    this.dashboardService.addSale(finalObject).subscribe(
      () => {
        this.finishSpinner = false;
        this.showToast('Venda criada', 'Sucesso', 'success');
        this.loadSchedules(this.loadSchedulesDate);
        this.selectedBook = {
          client: '',
          id: '',
          scheduledAt: '',
          time: '',
          service: '',
          idService: ''
        };
        this.cart = [];
        this.totalPrice = 0;
      }, () => {
        this.finishSpinner = false;
        this.showToast('Problema ao criar venda', 'Erro', 'danger');
      }
    );

  }
}
