import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

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
  startTracker = false;
  haveTypes = [];
  haveAmounts = [];
  addType: any;
  useType: any;
  addAmount: any;
  useAmount: any;


  constructor(public navCtrl: NavController, public restProvider: RestProvider, public storage: Storage) {
    this.getUsers();
  }

  getUsers() {
    this.restProvider.getUsers()
      .then(data => {

        let keys = Object.keys(data);
        this.currencyRates = data[keys[4]];
        this.currencyType = Object.keys(this.currencyRates);
        this.storeData('rates', this.currencyRates).then(data => {
          console.log('stored currencyRates');
        });
      }).catch(err => {
        console.log(err);
        this.getData('rates').then(data => {
          this.currencyRates = data;
          this.currencyType = Object.keys(this.currencyRates);
          console.log('inside get');
        }).catch(err => {
          console.log(err);
        })
    });
  }

  onCalculatorSubmit() {
    let cost = this.amount * (this.currencyRates[this.toType]/this.currencyRates[this.fromType]);
    this.amount = Number(this.amount).toFixed(2);
    cost = Number(cost).toFixed(2);
    document.getElementById("convertedCost").innerHTML = "<p>" + this.amount + " " + this.fromType + " = " + cost + " " + this.toType + "</p>"
  }
/*
  startNewTracker() {
    this.startTracker = true;
    let n = 0;
    while (n < this.haveTypes.length - 1) {
      this.removeData(this.haveTypes[n]).then(n = n + 1);
    }
    this.removeData(this.haveTypes[n]).then(this.haveTypes = [])
  }


  addMoney() {
    this.getData(this.addType).then ( data => {
      let newAmount = data + this.addAmount;
      this.storeData(this.addType, newAmount).then( data => {
        this.haveTypes.push(this.addType);
        this.addType = '';
        this.addAmount = 0;
        //this.displayMoneyTracker();
        this.getData(this.haveTypes[0]).then(data => {
          console.log(data);
        })
      })
    }).catch(err => {
      this.storeData(this.addType, this.addAmount).
        this.haveTypes.push(this.addType);
        this.addType = '';
        this.addAmount = 0;
        //this.displayMoneyTracker();
        console.log(this.haveTypes[0]);
        this.getData('AED').then(data => {
          console.log(data);
        })
      })
  }

  useMoney() {
    this.getData(this.useType).then ( data => {
      let newAmount = data - this.useAmount;
      this.storeData(this.useType, newAmount).then( data => {
        this.useType = '';
        this.useAmount = 0;
        this.displayMoneyTracker();
      })
    }). catch(err => {
      let newAmount = 0 - this.useAmount;
      this.storeData(this.useType, newAmount).then( data => {
        this.useType = '';
        this.useAmount = 0;
        this.displayMoneyTracker();
      })
    });
  }

  displayMoneyTracker() {
    var count = this.haveTypes.length;

    var tableHeader = "<table>";
    tableHeader += "<col width='150'>";
    tableHeader += "<col width='150'>";
    tableHeader += "<tr>";
    tableHeader += "<th>" + "Currency" + "</th>";
    tableHeader += "<th>" + "Amount Left" + "</th>";
    tableHeader += "</tr>";
    var tableContent = "";

    // Loop through the JSON and output each row in to a string.
    var n = 0;
    while (n < count) {
      this.getData(this.haveTypes[n]).then(data => {
        this.haveAmounts.push(data);
        n++;
      })
    }

   for(let i = 0; i < count; i++) {
     tableContent = tableContent + "<tr align='center'>";
     tableContent += "<td>" + this.haveTypes[i] + "</td>";
     tableContent += "<td>" + this.haveAmounts[i] + "</td>";
     tableContent += "<tr>";
   }

    var tableFooter = "</table>";

    // Get div and output the HTML. You can include these HTML strings straight in to your emailText variable.
    document.getElementById("wallet").innerHTML = tableHeader + tableContent + tableFooter;
  }

*/
  storeData(key, a) {
    return this.storage.set(key, a);
  }

  getData(k) {
    return this.storage.get(k);
  }

  removeData(k) {
    return this.storage.remove(k);
  }

}
