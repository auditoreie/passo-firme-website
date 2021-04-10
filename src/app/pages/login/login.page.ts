import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private menu: MenuController, public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(email.value, password.value) {
          this.router.navigate(['dashboard']);
          this.menu.enable(true)          
        } else {
          window.alert('Error')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}
