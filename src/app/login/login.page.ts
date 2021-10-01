import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { FirestoreService } from "../servicios/firestore.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit 
{
  createLogin: FormGroup;

  constructor(private router: Router, private menu: MenuController, private authService: FirestoreService, private fb: FormBuilder, 
    private loadingCtrl: LoadingController, public alertController: AlertController) 
  { 
    this.createLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(){
  this.menu.enable(false)
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
 
  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message,
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ingresar()
  {
    if(this.createLogin.invalid)
    {
      this.presentAlert('Uno o mas campos estan vacíos');
      return;
    }

    const data: any = 
    {
      username: this.createLogin.value.username,
      password: this.createLogin.value.password,
    }

    this.authService.login(data).then(res => {
      this.router.navigate(['/menu'])
    }).catch(err => this.presentAlert('Uno o mas campos estan vacíos'))
  }
}