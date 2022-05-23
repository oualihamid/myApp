import React, { useState } from "react";
import {Dimensions, TouchableOpacity } from "react-native";
import { Badge,Divider,Chip,  DataTable, Avatar   } from 'react-native-paper';
var moment = require('moment');
const {height, width} = Dimensions.get('window');
const itemWidth = (width - 20) ;

import DetailComponent from './DetailComponent';

const CardComposant = (props) => {
  const station = props.rowData.item;
  return (
    <TouchableOpacity   onPress={() => { props.navigation.navigate('Station',{station:station })   }}>       
      <DetailComponent station={station}/>        
    </TouchableOpacity> 
  );
};

export default CardComposant;