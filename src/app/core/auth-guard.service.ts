import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const Token = localStorage.getItem('Token');
    if (Token) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}