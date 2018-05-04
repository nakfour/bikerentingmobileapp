//import { HTTP } from '@ionic-native/http';
var http = import('ionic-native/http');

function createMembership() {
    console.log("Create Membership");
    // Change Image to Red Button
    /*document.getElementById("startButton").src = "img/Power-red.png";
    //Get a list of forms associated with the project.
    var options = {

    };

    var params = {};
    $fh.cloud(
      {
        path: '/hello',
        method: "GET",
        contentType: "application/json",
      },
      function (res) {
        console.log("GET Success");
        // Switch button to green
        document.getElementById("startButton").src = "img/Power-green.png";
      },
      function (code, errorprops, params) {
        alert('An error occured: ' + code + ' : ' + errorprops);
      }
    );*/

    this.http.get('<insert-url>', {}, {})
      .then(data => {

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });


}
