import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  statusCode = 'primary';
  statusOld = 'primary';

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.statusCode = 'primary';
        this.statusOld = 'primary';
      }
    });
  }

  ngOnInit(): void {
  }

  goCode(): void {
    this.statusOld = 'primary';
    this.router.navigate(['change/code']);
    this.statusCode = 'success';
  }

  goOld(): void {
    this.statusCode = 'primary';
    this.router.navigate(['change/old']);
    this.statusOld = 'success';
  }

  goBack(): void {
    this.router.navigate(['login']);
  }

}
