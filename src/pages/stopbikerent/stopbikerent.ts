import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the StopbikerentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
/*
"endtime" : rentalObject.endtime,
  "endstationid" : parseInt(rentalObject.endstationid),
  "endstationname" : rentalObject.endstationname,
  "endstationlat" : parseFloat(rentalObject.endstationlat),
  "endstationlon" : parseFloat(rentalObject.endstationlon)
                                          */

/* { "_id" : ObjectId("59b6dd01bf005e001713db1c"), "bikeid" : 18330, "usertype" : "Subscriber", "gender" : 1, "birthyear" : "1990",
   "starttime" : "2013-07-01 00:05:31", "startstationid" : 422, "startstationname" : "W 59 St & 10 Ave", "startstationlat" : 40.770513,
   "startstationlon" : -73.988038, "mobileos" : "Android", "endtime" : "2013-07-01 00:12:51",
   "endstationid" : 516, "endstationname" : "E 47 St & 1 Ave", "endstationlat" : 40.75206862, "endstationlon" : -73.96784384 } */


@IonicPage()
@Component({
  selector: 'page-stopbikerent',
  templateUrl: 'stopbikerent.html',
})
export class StopbikerentPage {

  @ViewChild('bikerentalSlider') bikerentalSlider: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopbikerentPage');
  }

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;


  constructor(public navCtrl: NavController,public http: Http,public formBuilder: FormBuilder, private toastCtrl: ToastController) {
      this.http=http;

      this.slideOneForm = formBuilder.group({
              bikeid:['18330'],
              endtime: ['2013-09-19 00:12:51']
          });

      this.slideTwoForm = formBuilder.group({
              endstationid: ['516'],
              endstationname: ['E 47 St & 1 Ave'],
              endstationlat:['40.75206862'],
              endstationlon:['-73.96784384']


          });
   }

  next(){
      this.bikerentalSlider.slideNext();
  }

  prev(){
      this.bikerentalSlider.slidePrev();
  }

  save(){
       this.submitAttempt = true;

        if(!this.slideOneForm.valid){
             this.bikerentalSlider.slideTo(0);
        }
        else if(!this.slideTwoForm.valid){
             this.bikerentalSlider.slideTo(1);
        }
        else {
             console.log("Submit Bike Rental");
             //console.log(this.slideOneForm.value);
             //console.log(this.slideTwoForm.value);

             /* { "_id" : ObjectId("59b6dd01bf005e001713db1c"), "bikeid" : 18330, "usertype" : "Subscriber", "gender" : 1, "birthyear" : "1990",
             "starttime" : "2013-07-01 00:05:31", "startstationid" : 422, "startstationname" : "W 59 St & 10 Ave", "startstationlat" : 40.770513,
             "startstationlon" : -73.988038, "mobileos" : "Android", "endtime" : "2013-07-01 00:12:51",
             "endstationid" : 516, "endstationname" : "E 47 St & 1 Ave", "endstationlat" : 40.75206862, "endstationlon" : -73.96784384 } */

             let data = {
              bikeid: Number(this.slideOneForm.value.bikeid),
              endtime: this.slideOneForm.value.endtime,

              endstationid: Number(this.slideTwoForm.value.endstationid),
              endstationname: this.slideTwoForm.value.endstationname,
              endstationlat:  Number(this.slideTwoForm.value.endstationlat),
              endstationlon:  Number(this.slideTwoForm.value.endstationlon),

             }

             console.log(data);
             this.sendHTTP(data)
        }
  }


  sendHTTP(data) {
///////////////////////// POST Start Rental ////////////////////////////////////
  let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
  	    this.http.post('<insert-url>', data, options)
  	      .subscribe(res => {
  	      	//console.log(res.json());
  	      	console.log("Success post stoprental");
  	      	console.log(res);
  	      	this.presentToast("Thank you for renting with us")
  	      	this.navCtrl.pop();
  	      }, (err) => {
  	        console.log("Error");
  	      	console.log(err);
  	      	this.presentToast("Error Ending Bike Rental");
  	      });



  }


  presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'middle'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }
}
