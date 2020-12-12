import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
    client: 'Ninguém',
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newBooking = this.formBuilder.group({
      client: '',
      date: '',
      time: ''
    });
  }

  public handleDateChange(selectedDate): void {
    this.date = selectedDate;
    const convertedDate = this.date.toISOString().split('T')[0];

    if (selectedDate < this.today) {
      this.dateButton = true;
    } else {
      this.newBooking.setValue({ client: '', date: convertedDate, time: '' });
      this.dateButton = false;
    }
  }

  public onSubmitBook(data): void {
    this.bookings.push(data);
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

}
