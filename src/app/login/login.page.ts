import { Component, OnInit } from '@angular/core';
import 
{
  FormGroup, 
  FormControl,
  Validator,
  FormBuilder,
  Validators
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit 
{
  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private router: Router, private menu: MenuController) 
  { 
    this.formularioLogin = this.fb.group(
      {
        'name': new FormControl("", Validators.required),
        'password': new FormControl("", Validators.required)
      }
    )
  }


  ngOnInit(){
  this.menu.enable(false)
  }

  ingresar()
  {
    var data = 
    {
      nombre: "ivan",
      contra: "1234"
    }

    localStorage.setItem('data', JSON.stringify(data))
    var user = JSON.parse(localStorage.getItem('data'))

    var f = this.formularioLogin.value

    if(user.nombre == f.name && user.contra == f.password )
    {
      console.log('Acceso consedido')
      this.formularioLogin.reset() 
      this.router.navigate(['/folder/Inbox'])
    }
    else
    {
      console.log('Acceso denegado')
    }
  }
}
