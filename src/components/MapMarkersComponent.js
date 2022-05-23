import React, { useState, useEffect, useRef   } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { Card, Title, Paragraph, Badge, Chip, Divider, DataTable, Avatar, Button } from 'react-native-paper';
var moment = require('moment');
import MapView, { Callout, Marker } from 'react-native-maps';
const {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const EDGE_PADDING = { top: 20, left: 20, bottom: 20, right: 20 }
const INIT_REGION = {
  latitude: 43.608568713084686,
  longitude: 1.443570238387108,
  latitudeDelta: 10,
  longitudeDelta: (15 * ASPECT_RATIO) ,
} 
import FiltreComponent from '../components/FiltreComponent';
import Store from './../stores';

const MapMarkersComponent = (props) => {
  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  const getData =()=>{
    // data fetching function
    const fetchData = async () => {
      const data = await Store.appStore.getList();
      setData(data);
    }
    fetchData()
      .catch(console.error);
  }

  useEffect(() => {
    // declare the data fetching function
    let markers = [];
    const fetchData = async () => {
      const result = await Store.appStore.getList();
        result.map((val,index)=>{
         let placeMarker = {
           latitude: val.position.lat,
           longitude: val.position.lng,
           key: index
         };
         markers.push(placeMarker);
       });
       setData(result);

       mapRef.current.fitToCoordinates(markers, {  edgePadding: EDGE_PADDING, animated: true })   
    }
    fetchData()
      .catch(console.error);
  }, [])

  return (
    <View style={styles.container}>

    <MapView
        ref={mapRef}
        style={{flex:1}}
        style={styles.map}
        pitchEnabled={false}
        loadingEnabled={true}
        loadingIndicatorColor='#d54933'
        showsPointsOfInterest={true}
        showsIndoorLevelPicker={true}
        zoomEnabled={true}
      >
       {data.map((marker, index) => (
          <Marker
            image={require('../images/icons/marker.png')} 
            key={index}
            coordinate={{ latitude : marker.position.lat , longitude : marker.position.lng }}
          >
          <Callout style={styles.pop}  onPress={() => props.navigation.navigate('Station',{station:marker})}>
              <TouchableOpacity >
                <Badge style={{backgroundColor:'green'}}>{marker.status}</Badge>
                <Text style={styles.titre}>{marker.name}</Text>
                <DataTable.Row>
                 <DataTable.Cell >dispo </DataTable.Cell>
                 <DataTable.Cell ><Avatar.Text size={24} label={marker.available_bikes} /></DataTable.Cell>
                 <DataTable.Cell >Total</DataTable.Cell>
                 <DataTable.Cell ><Avatar.Text size={24} label={marker.bike_stands} /></DataTable.Cell>
                </DataTable.Row>
                <Text>Maj: {moment(marker.last_update).format("DD/MM/YYYY hh:mm:ss")}</Text>
              </TouchableOpacity>   
          </Callout>

          </Marker>
        ))}
      </MapView>
          <Button  style={styles.buttonShow} mode="contained" onPress={getData}>
            <Text>Reload</Text>
          </Button>
       <FiltreComponent data={data} setData={setData}/>
     </View> 
  );
};

const styles = StyleSheet.create({
  container: {
      flex:1,
  },
   map:{
    ...StyleSheet.absoluteFillObject,
  },
  titre:{
    fontSize:13,
    fontWeight:'bold',
    color:'#ff0078',
  } ,
  pop: {
    width: 200,
    height: 110,
  },
  buttonShow:{
    top:60,
    right:5,
    width:120,
    height:45, 
    position:'absolute',
    color:'#FFF',
    borderRadius:20,
    fontSize:14,
    fontWeight:'bold',
    backgroundColor:'#C0C0C0', 
  }  
});

export default MapMarkersComponent;
