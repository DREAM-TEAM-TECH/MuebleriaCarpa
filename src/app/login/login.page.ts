import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from "../servicios/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit 
{
  email: string; 
  password: string;

  constructor(private router: Router, private menu: MenuController, private authService: AuthService) 
  { 
  }

  ngOnInit(){
  this.menu.enable(false)
  }
  ingresar()
  {
    this.authService.login(this.email, this.password).then(res => {
      this.router.navigate(['/menu'])
    }).catch(err => alert('Los datos son incorrectos'))
    this.email = null;
    this.password = null;
  }
}