import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dateButton = true;
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
      client: 'tinga',
      time: '13:00'
    },
    {
      date: '13/3/2020',
      client: 'tiringa',
      time: '14:00'
    },
    {
      date: '13/3/2020',
      client: 'tirinsga',
      time: '15:00'
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

  handleDateChange(selectedDate): void {
    this.date = selectedDate;
    const convertedDate = this.date.toISOString().split('T')[0];

    if (selectedDate < this.today) {
      this.dateButton = true;
    } else {
      this.newBooking.setValue({ client: '', date: convertedDate, time: '' });
      this.dateButton = false;
    }
  }

  onSubmitBook(data): void {
    this.bookings.push(data);
  }

  checkBook(book): void {
    this.selectedBook = book;
  }
}
