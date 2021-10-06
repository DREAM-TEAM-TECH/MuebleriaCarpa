import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirestoreService } from '../servicios/firestore.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit, AfterViewInit{

  createUser: FormGroup;

  constructor(private router: Router, private authService: FirestoreService, private fb: FormBuilder, 
    private loadingCtrl: LoadingController, public alertController: AlertController, public toastController: ToastController) 
  {
    this.createUser = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit()
  {
    this.createUser.reset()
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async registrar()
  {
    if(this.createUser.invalid)
    {
      this.presentAlert('Uno o mas campos estan vacíos');
      return;
    }

    const data: any = 
    {
      username: this.createUser.value.username,
      password: this.createUser.value.password,
    }
    this.authService.onRegister(data).then(res => {
      this.router.navigateByUrl('/login')
      this.createUser.reset();
      this.presentToast('Registro exitoso')
    }).catch(err => this.presentAlert(this.convertMessage(err)))
  }

  convertMessage(code: string)
  {
    if(code == 'FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use).')
    {
      return 'Usuario con email ya existente, intente con uno nuevo.';
    }
    if(code == 'FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).')
    {
      return 'El formato del email ingresado no es valido.'
    }
    if(code == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).')
    {
      return 'La contraseña debe tener al menos 6 caracteres.'
    }
  }

}
