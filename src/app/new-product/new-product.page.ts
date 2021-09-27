import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  product = {
    id: '',
    categoria: '',
    material: '',
    color: '',
    existencia: '',
    nombre: '',
    precio: '',
    descripcion: ''
  }

  constructor() { }

  ngOnInit() {
  }

  onSubmitTemplate(){
    console.log('Form submit');
    console.log(this.product);
  }

}
