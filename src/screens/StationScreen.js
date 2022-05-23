import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Card,Title,Paragraph,Badge,Chip,Divider, DataTable, Avatar } from 'react-native-paper';
var moment = require('moment');
import MapComponent from '../components/MapComponent';
import DetailComponent from '../components/DetailComponent';


const StationScreen = (props) => {
  const station = props.route.params.station;
  return (
    <SafeAreaView>
     <Card>
      <DetailComponent station={station} />
      <Card.Content style={styles.cardMap}>
        <MapComponent position={station.position}/>
      </Card.Content>
    </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardMap:{
    width:'100%',
    height:'70%',
  }
});

export default StationScreen;