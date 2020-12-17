import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuService, NbSidebarService, NB_WINDOW } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // type 1 = admin, type 2= manager, type 3 = employee

  userRole = 'None';
  userName = 'None';
  sideToggle = false;
  contextItems = [
    { title: 'Sair' }
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private nbMenuService: NbMenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userName = userInfo.Name;
    if (userInfo.Type === '1') {
      this.userRole = 'Administrador';
    } else if (userInfo.Type === '2') {
      this.userRole = 'Gerente';
    } else {
      this.userRole = 'Funcionário';
    }

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(() => this.logOut());
  }

  ngOnDestroy(): void {
  }

  toggle(): boolean {
    this.sideToggle = !this.sideToggle;
    this.sidebarService.toggle(true);
    return false;
  }

  logOut(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('userInfo');
    this.router.navigate(['login']);
  }

}
