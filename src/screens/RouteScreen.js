import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView  } from "react-native";
import { Card,Title,Paragraph,Badge,Chip,Divider,DataTable, Avatar  } from 'react-native-paper';
var moment = require('moment');
import DetailComponent from '../components/DetailComponent';

const RouteScreen = (props) => {
  const stationDeparture = props.route.params.departure;
  const stationArrival = props.route.params.arrival;

  return (
    <SafeAreaView>
      <ScrollView>
        <Title style={styles.title}>station de départ</Title>
        <TouchableOpacity onPress={() => { props.navigation.navigate('Station',{station:stationDeparture })   }}>     
          <DetailComponent station={stationDeparture} />
        </TouchableOpacity>  
        <Title style={styles.title}>station d'arrivée</Title>
        <TouchableOpacity   onPress={() => { props.navigation.navigate('Station',{station:stationArrival })   }}>           
          <DetailComponent station={stationArrival} />
         </TouchableOpacity>  
      </ScrollView>
    </SafeAreaView>   
  );
};

const styles = StyleSheet.create({
  title:{
    marginLeft:10,
  }
});

export default RouteScreen;