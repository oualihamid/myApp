import React, { useState } from "react";
import { Image,
  View, 
  StyleSheet} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocalisationComponent = (props) => {
  return (
    <View style={styles.container}>
         <GooglePlacesAutocomplete
          textInputProps={{
            selectionColor: 'gray'
          }}
          placeholder={props.choice == 1 ? "Taper l'adresse de départ" : "Taper l'adresse de retour"}    
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          listViewDisplayed='false'    // true/false/undefined
         renderLeftButton={()  => <View style={styles.leftBouton}><Image style={styles.img} source={require('../images/icons/location.png')} /></View>}
           onPress={(data, details = null) => {
              props.choice == 1 ? props.setDeparture(details) : props.setArrival(details) ;
          }}
         
          styles={{
            textInputContainer: {
              backgroundColor:'#FFF',
              alignItems: 'center',
               borderTopWidth: 0,
               borderBottomWidth:0,
               height: 60,
               borderRadius: 30,
            },
             listView:{
              backgroundColor:'#FFF',
            },
            description: {
             // fontWeight: 'bold',
             // color:'#1E90FF',
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              marginTop:0,
              height:'100%',
              width:'100%',
              color: 'gray',
             // fontSize: 16,
             backgroundColor:'transparent',
            
             // borderBottomWidth: 0.5,
            },
            predefinedPlacesDescription: {
              color: 'green'
            },
          
          }}
          query={{
            types:'address',
            key: 'AIzaSyCtDPU0hgYXQNDEnQkcsK8eRdShldLcRxI',
            language: 'fr', // language of the results
            components: 'country:fr',
            
          }}
          currentLocation={false}/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
   height:'100%',
   width:'100%',
    // marginLeft:'2%',
    marginBottom:20,
    //paddingTop: Constants.statusBarHeight,
   // backgroundColor:color,
  },
   titre:{
    marginTop:25,
    marginBottom:10,
    fontWeight:'bold',
    fontSize:16,
  },
  leftBouton:{
    height:60,
    width:60,
    borderRadius:30,
    backgroundColor:'#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth:1,
    borderColor:'#1E90FF',
  },
  img:{
    height:30,
    width:25
  },
   cleanButton:{
    justifyContent: 'center',
    alignItems:'center',
    width:40,
    height:50,
    right:0,
    top:0
  },
  imgClose:{
    height:15,
    width:15
  }
});

export default LocalisationComponent;