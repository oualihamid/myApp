import React, { useState } from "react";
import { Alert, Modal,Dimensions, StyleSheet, Text, Pressable, View,TouchableOpacity, SafeAreaView  } from "react-native";
const {height, width} = Dimensions.get('window');
import {  Button,TextInput   } from 'react-native-paper';
import Store from './../stores';
import LocalisationComponent from '../components/LocalisationComponent';

const SearchSCreen = (props) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [nbBike, setNbBike] = useState("");

  return (
    <SafeAreaView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Combiend de vélos ? </Text>
                <TextInput
                style={{width:200}}
                label="Taper un nombre"
                value={nbBike}
                 keyboardType="numeric"
                onChangeText={nb => setNbBike(nb)}
              />
                <Button  style={styles.buttonShow} mode="contained" onPress={() => setModalVisible(!modalVisible)}>
                    Valider
                </Button>   
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.location}>
        <View style={{height:200,top:5}}>
          <LocalisationComponent  choice={1}  setDeparture={setDeparture}/>
        </View>           
          
        <View>
          <LocalisationComponent  choice={2} setArrival={setArrival}/>    
        </View>
      </View>
      
      { departure && arrival   ? <Button  style={styles.button} mode="contained" onPress={() =>{ 
        if (nbBike == ""){
          setModalVisible(true)  
        }else{
          Store.appStore.search(departure,arrival,nbBike,props.navigation);    
        }    
      } }>
        Rechercher 
      </Button>:null}  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  location: {  
    height:height-200
  },
 
   modalView: {
    top:100,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    height:200,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
     backgroundColor:'#ff0078',
     width:200,
     alignSelf:'center'

  },
  // buttonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
    buttonShow:{
    marginTop:20,
    backgroundColor:'#ff0078'
  }
 
});

export default SearchSCreen;