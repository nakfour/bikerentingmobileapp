import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

// Start Rental information
/*"bikeid" : rentalObject.bikeid,
                       "usertype" : rentalObject.usertype,
                       "gender" : rentalObject.gender,
                       "birthyear" : rentalObject.birthyear,
                       "starttime" : rentalObject.starttime,
                       "startstationid" : rentalObject.startstationid,
                       "startstationname" : rentalObject.startstationname,
                       "startstationlat" : rentalObject.startstationlat,
                       "startstationlon" : rentalObject.startstationlon,
                       "mobileos" : rentalObject.mobileos*/
/* { "_id" : ObjectId("59b6dd01bf005e001713db1c"), "bikeid" : 18330, "usertype" : "Subscriber", "gender" : 1, "birthyear" : "1990",
"starttime" : "2013-07-01 00:05:31", "startstationid" : 422, "startstationname" : "W 59 St & 10 Ave", "startstationlat" : 40.770513,
"startstationlon" : -73.988038, "mobileos" : "Android", "endtime" : "2013-07-01 00:12:51",
"endstationid" : 516, "endstationname" : "E 47 St & 1 Ave", "endstationlat" : 40.75206862, "endstationlon" : -73.96784384 } */
// Drop Rental Information

/*"endtime" : rentalObject.endtime,
                                            "endstationid" : rentalObject.endstationid,
                                            "endstationname" : rentalObject.endstationname,
                                            "endstationlat" : rentalObject.endstationlat,
                                            "endstationlon" : rentalObject.endstationlon
                                            */
/**
 * Generated class for the StartbikerentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-startbikerent',
  templateUrl: 'startbikerent.html',
})
export class StartbikerentPage {
@ViewChild('bikerentalSlider') bikerentalSlider: any;


  ionViewDidLoad() {
    console.log('ionViewDidLoad StartbikerentPage');
  }
  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;


  constructor(public navCtrl: NavController,public http: Http,public formBuilder: FormBuilder, private toastCtrl: ToastController) {
      this.http=http
      this.slideOneForm = formBuilder.group({
              bikeid:['18330'],
              subscriber: ['Subscriber'],
              gender: ['2'],
              birthyear: ['1971'],
              starttime: ['2017-09-19 00:05:31'],
          });

      this.slideTwoForm = formBuilder.group({
              startstationid: ['422'],
              startstationname: ['W 59 St & 10 Ave'],
              startstationlat:['40.770513'],
              startstationlon:['-73.988038'],
              mobileos: ['Android']


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
              usertype: this.slideOneForm.value.subscriber,
              gender: Number(this.slideOneForm.value.gender),
              birthyear: this.slideOneForm.value.birthyear,
              starttime: this.slideOneForm.value.starttime,

              startstationid: Number(this.slideTwoForm.value.startstationid),
              startstationname: this.slideTwoForm.value.startstationname,
              startstationlat:  Number(this.slideTwoForm.value.startstationlat),
              startstationlon:  Number(this.slideTwoForm.value.startstationlon),
              mobileos: this.slideTwoForm.value.mobileos
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
  	      	console.log("success post rental");
  	      	console.log(res);
  	      	// Go back to main menu
  	      	this.presentToast("Please Bike Safely");
  	      	this.navCtrl.pop();
  	      }, (err) => {
  	        console.log("Error");
  	      	console.log(err);
  	      	this.presentToast("Error Starting Bike Rental");

  	      });


////////////////////// GET Membership ////////////////////////

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
