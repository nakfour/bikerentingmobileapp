import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StartbikerentPage} from '../startbikerent/startbikerent';
import {StopbikerentPage} from '../stopbikerent/stopbikerent';

import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mainlist') mainlist: any;
  @ViewChild('startrent') startrent ;
  @ViewChild('droprent') droprent ;
  @ViewChild('rentaltext') rentaltext ;
  bikeID=0;
  rentalStatusText="";

  // false when not in a rental and true when in a rental
  // This controls the bike rental button show/hide
  public rentalstatus: boolean = false;


ionViewDidLoad() {
    console.log(this.mainlist);
    console.log(this.startrent);
    console.log(this.droprent);
    console.log(this.rentaltext);

}

constructor(public navCtrl: NavController, public http: Http, private _barcodeScanner: BarcodeScanner, private toastCtrl: ToastController) {

}
public  itemTapped(e) {
     console.log("itemTapped");
     //console.log(e);
     console.log("X position");
     console.log(e.pointers[0].clientX);
     console.log("Y position");
     console.log(e.pointers[0].clientY);
     let touchdata = {
        x: e.pointers[0].clientX,
        y: e.pointers[0].clientY
     }
     console.log(touchdata);
     this.sendTouchData(touchdata);
}

public scanQR() {

    this._barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        return false;
      }
      console.log("Scanned successfully!");
      console.log(barcodeData);

      this.bikeID=Number(barcodeData.text);
      let data = {
          bikeid: Number(barcodeData.text),
          usertype: 'Subscriber',
          gender: 2,
          birthyear: '1971',
          starttime: '2017-09-19 00:05:31',
          startstationid: 422,
          startstationname: 'W 59 St & 10 Ave',
          startstationlat:  40.770513,
          startstationlon:  -73.988038,
          mobileos: 'Android'
      }
      console.log("Sending HTTP POST for bike rental data");
      console.log(data);

      this.sendHTTPRent(data,barcodeData.text);
    }, (err) => {
      console.log(err);
    });
  }

public returnBike() {
    let data = {
        bikeid: this.bikeID,
        endtime: '2013-09-19 00:12:51',
        endstationid: 516,
        endstationname: 'E 47 St & 1 Ave',
        endstationlat:  40.75206862,
        endstationlon:  -73.96784384,
     }
     this.sendHTTPReturn(data);

}


///////////////////////// POST Start Rental ////////////////////////////////////
sendHTTPRent(data, bikeid) {
  let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
  	  this.http.post('<insert-url>', data, options)
  	      .subscribe(res => {
  	      	//console.log(res.json());
  	      	console.log("success post rental");
  	      	console.log(res);
  	      	// Go back to main menu
  	      	var msg="Enjoy riding bike #" + bikeid;
  	      	this.presentToast(msg);
  	      	this.rentalstatus = true;
  	      	this.rentalStatusText="You are now Renting bike #" + bikeid;
  	      	this.navCtrl.pop();


  	      }, (err) => {
  	        console.log("Error");
  	      	console.log(err);
  	      	this.presentToast("Error Starting Bike Rental");

  	      });
  }

///////////////////////// POST Drop Rental ////////////////////////////////////
sendHTTPReturn(data) {
  let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
  	    this.http.post('<insert-url>', data, options)
  	      .subscribe(res => {
  	      	//console.log(res.json());
  	      	console.log("Success post stoprental");
  	      	console.log(res);
  	      	this.presentToast("Thank you for renting with us")
  	      	this.rentalstatus = false;
  	      	this.navCtrl.pop();
  	      }, (err) => {
  	        console.log("Error");
  	      	console.log(err);
  	      	this.presentToast("Error Ending Bike Rental");
  	      });
  }

///////////////////////// POST Touch Data ////////////////////////////////////
sendTouchData(data) {
  let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
  	    this.http.post('<insert-url>', data, options)
  	      .subscribe(res => {
  	      	//console.log(res.json());
  	      	console.log("Success post touch data");
  	      	console.log(res);
  	      }, (err) => {
  	        console.log("Error");
  	      	console.log(err);
  	      });
  }



  presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 6000,
        position: 'top',
        cssClass:"toaststyle"
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }
}
