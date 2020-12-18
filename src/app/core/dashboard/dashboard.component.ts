import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { DashboardService } from 'src/app/services/dashboard.service';

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

  // Variáveis de controle
  scheduleButton = true; // Controla o botão de Reserva
  scheduleSpinner = false; // Spinner do botao de Reservar
  avulsoToggle = false; // Identifica se a venda é avulsa ou não
  clearButton = true; // Controla o botão de Limpar do carrinho
  scheduleCardSpinner = false; // Spinner do card das Reservas
  deleteButton = true; // Controla o botão de Excluir Reserva
  emptySchedule = true; // Controla se há reservas no dia

  // Form
  newBooking: FormGroup; // Cria o form de Nova Reserva

  // Dados úteis
  date = new Date(); // Data que será alterada
  today = new Date(); // Data que será usada como parâmetro
  loadSchedulesDate: string;

  selectedBook: { // Salva qual a Reserva está selecionada no momento, ao iniciar será o valor Default
    client: string,
    id: string,
    scheduledAt: string,
    time: string,
    service: string
  } = {
      client: '',
      id: '',
      scheduledAt: '',
      time: '',
      service: ''
    };

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
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

  showToast(message, title, status): void { // Exibe o Toastr
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

  private loadSchedules(date): void {
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
            service: res[book].service
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
    this.deleteButton = false;
    this.selectedBook = book;
    console.log(this.selectedBook);
  }

  public changeAvulso(): void { // Muda os dados da Reserva selecionada de acordo com o Toggle
    this.deleteButton = true;
    this.avulsoToggle = !this.avulsoToggle;
    if (this.avulsoToggle === true) {
      this.selectedBook = { // Aqui a venda é avulsa, precisa pegar data e tempo do momento do toggle
        client: '',
        id: '',
        scheduledAt: '',
        time: '',
        service: ''
      };
    } else {
      this.selectedBook = {
        client: '',
        id: '',
        scheduledAt: '',
        time: '',
        service: ''
      };
    }
  }

  public openModal(): void { // Abre o modal para selecionar os produtos
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

  public removeItem(item): void { // Remove um item do carrinho
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

  public clearCart(): void { // Limpa o carrinho
    this.cart = [];
    this.clearButton = true;
  }
}
