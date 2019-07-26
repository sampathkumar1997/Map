import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  address:any='';
  MyLocation: any;

  constructor(public navCtrl: NavController) {

  }
  calculateAndDisplayRoute() {
    let that= this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('address'), {
      zoom: 7,
      center: {lat: 12.9716, lng: 77.5946}
    });
    directionsDisplay.setMap(map);

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos={
          lat:position.coords.latitude,
          lng:position.coords.longitude
        };

        map.setCenter(pos);
        this.MyLocation = new google.maps.LatLong(pos);

      }, function() {
       });
    } else {
    }


    directionsService.route({
      origin: this.MyLocation,
      destination: this.address,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
