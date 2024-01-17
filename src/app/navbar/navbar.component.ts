import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor(public fetchApiData: FetchApiDataService,
    public router: Router) {}

    ngOnInit(): void {
      // Check if the user is logged in
      this.isLoggedIn = !!localStorage.getItem('token');
    }

public openMovie(): void{
  this.router.navigate(['movies'])
}

public openProfile(): void{
  this.router.navigate(['profile'])
}

public logoutUser(): void {
  localStorage.setItem('token','');
  localStorage.setItem('user','');
  this.router.navigate(['welcome']);
}
}
