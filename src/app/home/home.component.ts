import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Service/guard/services/authentication.service';


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

  constructor(private authenticationService: AuthenticationService) {
    this.timer(1);
  }

  ngOnInit(): void { }

  logout() {
    this.authenticationService.logout();
  }

  goToGoogle() {
    window.location.href = 'https://www.google.com/';
  }

  display: any;
  

  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let finishSec: any = "0";
    let startSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (startSec != 0) startSec--;
      else startSec = 59;

      if (startSec < 10) {
        finishSec = "0" + startSec;
      } else finishSec = startSec;

      this.display = `${finishSec}`;

      if (seconds == 0) {
        console.log(this.logout);
        clearInterval(timer);
      }
    }, 1000);
  }
}

