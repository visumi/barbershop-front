import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo.Type === '1' || userInfo.Type === '2') {
      return true;
    } else {
      this.router.navigate(['dashboard']);
      return false;
    }
  }

}
