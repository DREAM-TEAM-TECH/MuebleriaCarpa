import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';

interface Category {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  product = new FormGroup ({
    id: new FormControl(''),
    category: new FormControl(''),
    material: new FormControl(''),
    color: new FormControl(''),
    stock: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log('Form submit');
    console.log(this.product.value);
  }

}
