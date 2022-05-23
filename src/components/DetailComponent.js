import React, { useState } from "react";
import { StyleSheet, View  } from "react-native";
import { Card,Title,Paragraph,Badge,Divider, DataTable, Avatar } from 'react-native-paper';
var moment = require('moment');

const DetailComponent = (props) => {
  const station = props.station;

  return (
     <Card style={styles.item}>
      <Card.Content>
        <Title style={styles.name}>{station.name}</Title>
        <Paragraph style={styles.adress}>{station.address} - {station.contract_name.toUpperCase()} </Paragraph>
        <View style={{marginBottom:5}} />
        <Badge style={{backgroundColor:'green'}}>{station.status}</Badge>
        <Divider style={{margin:5,marginBottom:10}} />
         <DataTable.Row>
           <DataTable.Cell >dispo </DataTable.Cell>
           <DataTable.Cell ><Avatar.Text size={24} label={station.available_bikes} /></DataTable.Cell>
           <DataTable.Cell >Total</DataTable.Cell>
           <DataTable.Cell ><Avatar.Text size={24} label={station.bike_stands} /></DataTable.Cell>
           <DataTable.Cell >CB</DataTable.Cell>
           <DataTable.Cell ><Avatar.Text size={24} label={ station.banking == true ?"Oui":"Non"} /></DataTable.Cell>
        </DataTable.Row>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  item:{
    backgroundColor:'#FFF',
    marginTop: 20,
    borderRadius:10,
    margin:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  name: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight:'bold',
    color:'#ff0078',
  },
  adress:{
    fontSize:11,
  }
});

export default DetailComponent;