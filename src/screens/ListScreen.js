import React, { useState, useEffect  } from "react";
import { Alert, Modal, StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { Title  } from 'react-native-paper';

import CardComponent from '../components/CardComponent';
import FiltreComponent from '../components/FiltreComponent';

import Store from './../stores';

const ListScreen = (props) => {
  const [data, setData] = useState([]);
    
  useEffect(() => {
    // data fetching function
    const fetchData = async () => {
      const data = await Store.appStore.getList();
      setData(data);
    }
    fetchData()
      .catch(console.error);
  }, [])

  return (
    <SafeAreaView style={{flex:1}}>
      <Title style={styles.title}>Stations ({data.length}) </Title>
      <FiltreComponent data={data} setData={setData}/>
      <FlatList style={{margin:5}}
        data={data}
        keyExtractor={item => item.number}
          renderItem={(item) => <CardComponent navigation={props.navigation}  rowData={item} />}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
container: {
      flex:1,
    },
    item:{
      overflow: 'hidden',
      backgroundColor:'#FFF',
      height: 180,
      borderRadius:10,
  },
  title:{
    left:10,
    alignItems: "center",
  }  
});

export default ListScreen;

