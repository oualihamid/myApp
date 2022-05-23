import React, { useState } from "react";
import { Modal, StyleSheet, Pressable, View, ScrollView } from "react-native";
import { Card,Title,Paragraph,Badge,Chip,Divider,TextInput,Switch,Button    } from 'react-native-paper';

const plusSCreen = ({data,setData }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [open, setOpen] = useState(true);
    const [nbBike, setNbBike] = useState("");

    let newArray = data.filter(function (el) {
      let status = open == true ? "OPEN":"CLOSE";    
      return el.available_bikes >= nbBike &&  el.status == status &&  el.name.toUpperCase().includes(name.toUpperCase()); 
    });

  const onToggleSwitch = () => setOpen(!open);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View >
          <View style={styles.modalView}>
            <Pressable
                onPress={() => setModalVisible(!modalVisible)}
              >  
              <Badge size={45} style={styles.close}>X</Badge>
            </Pressable>  
            <ScrollView>
                    <Card style={styles.item}>
                        <Card.Content>
                          <Title>Filtrer le résultat</Title>
                          <Paragraph>Nom de la station</Paragraph>
                           <TextInput
                            label="Nom"
                            value={name}
                            onChangeText={text => setName(text)}
                          />  
                          <Paragraph style={styles.title2}>Ouvert </Paragraph>
                          <Switch value={open} onValueChange={onToggleSwitch}/>

                          <Paragraph style={styles.title2}>Nb de Bike disponible</Paragraph>
                           <TextInput
                            label="Taper un nombre"
                            value={nbBike}
                             keyboardType="numeric"
                            onChangeText={nb => setNbBike(nb)}
                          />
                          <Button  style={styles.buttonShow} mode="contained" onPress={() =>{setData(newArray); setModalVisible(!modalVisible)} }>
                            Afficher ({newArray.length})
                          </Button>  

                      </Card.Content>
                    </Card>
                </ScrollView>  
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>  
        <Badge size={35} style={styles.button}>Filtrer</Badge>
      </Pressable> 
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width:'100%',
    height:'100%',
    //top:10,
    //margin:40,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    margin:10,
    width:70,
    color:'#FFF',
    borderRadius:20,
    margin:0,
    fontSize:14,
    fontWeight:'bold',
    backgroundColor:'gray'
  },
  close:{
    margin:10,  
    backgroundColor:'gray',
    color:'#FFF'
  },
  buttonShow:{
    marginTop:20,
    backgroundColor:'#ff0078'
  }

});

export default plusSCreen;