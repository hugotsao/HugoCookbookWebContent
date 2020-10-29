import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {username: '', password: ''};
  constructor(
    private dataStoreService: DataStoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  login() {
    this.dataStoreService.authenticate(this.credentials, () => {
      this.router.navigateByUrl(`${this.router.url}`);
    });
  return false;
  }

}
