import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currencyRates: any;
  currencyType: any;
  fromType: any;
  toType: any;
  amount: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getUsers();
  }

  getUsers() {
    this.restProvider.getUsers()
      .then(data => {
        let keys = Object.keys(data);
        this.currencyRates = data[keys[4]];
        this.currencyType = Object.keys(this.currencyRates);
      });
  }

  onCalculatorSubmit() {
    let cost = this.amount * (this.currencyRates[this.toType]/this.currencyRates[this.fromType]);
    this.amount = Number(this.amount).toFixed(2);
    cost = Number(cost).toFixed(2);
    document.getElementById("convertedCost").innerHTML = "<p>" + this.amount + " " + this.fromType + " = " + cost + " " + this.toType + "</p>"
  }



}
