import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sideToggle = false;

  constructor(
    private sidebarService: NbSidebarService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  toggle(): boolean {
    this.sideToggle = !this.sideToggle;
    this.sidebarService.toggle(true);
    return false;
  }

}
