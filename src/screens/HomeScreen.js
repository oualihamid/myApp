import React, { useState } from "react";
import { StyleSheet, SafeAreaView  } from "react-native";
import MapMarkersComponent from '../components/MapMarkersComponent';

const HomeScreen = (props) => {
  return (
   <SafeAreaView style={styles.container}>
      <MapMarkersComponent navigation={props.navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});
export default HomeScreen;
