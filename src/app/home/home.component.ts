import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Service/authentication.service';
import { WeatherService } from '../Service/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  timeline: any = [];
  forecasted: any = [];
  weatherNow: any = [];
  currentTime = new Date();
  location: any = [];

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void { }

  logout() {
    this.authenticationService.logout();
  }

  goGoogle() {
    window.location.href = 'https://www.google.com/';
  }

  }
