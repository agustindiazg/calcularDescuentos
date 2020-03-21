import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  buttons : number[];
  price: string;
  descuento: number;
  cantCombos: number;
  cantProductus: number;

  constructor(private vibration: Vibration)
  {
    this.cantCombos = 1;
    this.cantProductus = 2;
    this.price = '0';
    this.descuento = 70;
    this.buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  }

  // Agrega el digito seleccionado a la calculadora
  addNumber(val:number)
  {
    this.vibration.vibrate(1000);
    if (this.price == '0') this.price = val.toString();
    else this.price = this.price + val;
  }

  // Funcion que elimina el ultimo numero del precio
  deleteLastNumber()
  {
    this.price = this.price.substring(0, this.price.length - 1);
  }

  // Funcion que limpia el input del precio del producto
  clearInput() : void
  {
    this.price = '';
  }

  formatedPrice()
  {
    return this.price.replace('.', ',');
  }

  // Funcion que devuelve el precio del segundo producto, con el descuento aplicado
  precioSegundoProducto() : number
  {
    return parseFloat(this.price) - (parseFloat(this.price) * (this.descuento / 100));
  }

  // Calcula cual seria el precio final x producto
  precioUnitario(): number
  {
    return this.total() / (this.cantCombos * this.cantProductus);
  }

  // Funcion que calcula el valor de un combo, usando el calculo del precio del producto con descuento
  totalCombo(): number
  {
    return (this.precioSegundoProducto() + parseFloat(this.price));
  }

  // Multiplica el precio del combo, por la cantidad de combos a llevar
  total(): number
  {
    return this.totalCombo() * this.cantCombos;
  }

  // Calcula cual fue el ahorro total en la compra
  ahorroTotal(): number
  {
    return (parseFloat(this.price) - (this.precioSegundoProducto())) * this.cantCombos;
  }

  // Calcula el precio final sin el descuento
  totalSinDescuento()
  {
    return this.total() + this.ahorroTotal();
  }


}
