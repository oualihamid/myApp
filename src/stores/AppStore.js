import { observable, action, computed } from 'mobx';
import {   Button, Alert} from "react-native";

import axios from 'axios';

export default class appStore {
	@observable counter = 0;

	@action async getList(type){
    let url='https://api.jcdecaux.com/vls/v1/stations?apiKey=bd5a70c20ee181300971d04d5ea91ceb9f86b103&contract=Rouen';
    if(typeof type != 'undefined' && type == "all" ){
      url='https://api.jcdecaux.com/vls/v1/stations?apiKey=bd5a70c20ee181300971d04d5ea91ceb9f86b103';
    }
    try {
      const result = await axios.get(url);
      return result.data;
    } catch (error) {
      console.log(error);
    }
	}

  @action async search(departure,arrival,nbBike , nav){
    //console.log("search",arrival.geometry.location.lat );
    let result = await this.getList("all")
 
    // get departure station
    let depart = await this.getsGeolocation(departure.geometry.location, result, nbBike,"departure" );
  
    // get arrival station
    let arrive = await this.getsGeolocation(arrival.geometry.location, result, nbBike, "arrival");
      
    if(typeof depart == 'undefined'){
      Alert.alert("désolé nous n'avant pas trouvé une station pour votre départ");
    }else if (arrive == 'undefined' ) {
        Alert.alert("désolé nous n'avant pas trouvé une station pour votre arrivé");  
    }else{
      nav.navigate('Route',{departure:depart, arrival:arrive});
    }
  }

  @action async  getsGeolocation(position, result, nbBike, route){
    let lat,lng,distanceMax=100000000;
    let nbStation=0;
    let stationSelected;
      if(position.lat && position.lng){
        let  distance = 0;
        while (distance < distanceMax && nbStation == 0 ){  
          distance+=300;
          const c = {
                 lat: Number(position.lat), // your latitude
                 lng: Number(position.lng), // your longitude
                 distanceP: distance, // distance positive on meter
                 distanceN: -distance // distance negative on meter
              }

            const earth = 6378.137 // radius of the earth in kilometer
            const pi = Math.PI
            const cos = Math.cos
            const m = (1 / ((2 * pi / 360) * earth)) / 1000 // 1 meter in degree
            let poly=[];
            const newC = {
              newLatitudeP: c.lat + (c.distanceP * m), // max latitude
              newLongitudeP: c.lng + (c.distanceP * m) / cos(c.lat * (pi / 180)), // max longitude
              newLatitudeN: c.lat + (c.distanceN * m), // min latitude
              newLongitudeN: c.lng + (c.distanceN * m) / cos(c.lat * (pi / 180)) // min longitude
            }
           
            poly.push([newC.newLatitudeP,newC.newLongitudeP]);
            poly.push([newC.newLatitudeN,newC.newLongitudeN]);
            for (let b = 0; b < result.length; b++) {
              let val = result[b];
              let x = val.position.lat, y = val.position.lng;
              for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                let xi = poly[i][0], yi = poly[i][1];
                let xj = poly[j][0], yj = poly[j][1];
                if( ((yi >= y) != (yj > y)) && (x <= (xj - xi) * (y - yi) / (yj - yi) + xi)
                  && (val.available_bikes >= nbBike   && route == "departure" ) && val.status == "OPEN"
                ){
                  nbStation=1;
                  stationSelected = val;
                  break;  
                }
                if( ((yi >= y) != (yj > y)) && (x <= (xj - xi) * (y - yi) / (yj - yi) + xi)
                  && (val.available_bikes >= nbBike   && route == "arrival" ) && val.status == "OPEN"
                ){
                  nbStation=1;
                  stationSelected = val;
                  break;  
                }
              }
              if(stationSelected){
                return stationSelected;
              };
            }
        }
      }
  }
}
