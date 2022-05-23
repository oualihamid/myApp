import React, { useState } from "react";
import {StyleSheet, Dimensions, View } from "react-native";
import MapView, { Callout, Marker } from 'react-native-maps';
const {height, width} = Dimensions.get('window');

const MapComponent = (props) => { 
  return (
   <MapView
      style={{flex:1}}
      style={styles.map}
      pitchEnabled={false}
      loadingEnabled={true}
      loadingIndicatorColor='#d54933'
      showsPointsOfInterest={true}
      showsIndoorLevelPicker={true}
      zoomEnabled={true}
    >
      {props.position.lat && props.position.lng ? <Marker
        image={require('../images/icons/marker.png')} 
        coordinate={{ latitude : props.position.lat , longitude : props.position.lng }}
      />:null}
    </MapView>   
  );
};

const styles = StyleSheet.create({
   map:{
    ...StyleSheet.absoluteFillObject,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    margin:10,
  },
});

export default MapComponent;