import { Component, OnDestroy, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { interval, Subscription, timer } from 'rxjs';
import { AuthenticationService } from './Service/guard/services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {

    display: any;
  
    constructor(public authenticationService: AuthenticationService) {

      //this.timer(1);
    }
  }





  
    /*
    logout() {
      this.authenticationService.logout();
    }
  

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
  


  /*showToast() {
    this.toast.success('Usuário e senha cadastrado com sucesso!');
    this.toast.warning('Cadastre um e-mail e uma senha válidos para efetuar o login na rede.');
    this.toast.error('Cadastre uma senha com pelo menos um caracter especial, uma letra maiúscula, uma letra minúscula, um número e ela deve conter pelo menos 6 caracteres.');
    this.toast.info(''); // ainda não sei
  }

  //customizar
  customToast() {
    this.toast.success('', {
      duration: 5000,
      style: {
        border: '',
        padding: '',
        color: '',
      },
      iconTheme: {
        primary: '',
        secondary: '',
      },
    });
  }*/