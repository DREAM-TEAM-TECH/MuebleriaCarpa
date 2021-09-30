import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {firebaseConfig} from "../environments/environment";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsService } from './servicios/tab.service';
 
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule, AngularFirestoreModule, FormsModule, ReactiveFormsModule],
  providers: [TabsService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
