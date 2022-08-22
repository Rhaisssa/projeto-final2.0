import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './Service/guard/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Projeto-Final-2.0';

  constructor(public authenticationService: AuthenticationService, private router: Router) {}

  logout() {
    this.authenticationService.logout();
  }

}