
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import {Modal,Portal,Provider, Switch,Button, SegmentedButtons,Snackbar ,IconButton,Divider} from 'react-native-paper';
  import {NavButtons} from "../components/navButtons";
  import {styles} from "../screens/commonStyles";
  import {webServiceTypes, apiAuth} from "../services/serviceType";

  const Home=({ navigation })=> {
    const [value, setValue] = React.useState('home');
    const [roverData, setRoverData] = useState([]);
    const [curiosity, setCuriosity] = useState([]);
    const [opportunity, setOpportunity] = useState([]);
    const [spirit, setSpirit] = useState([]);
    const [perseverance, setPerseverance] = useState([]);
    const [dayPic, setDayPic] = useState({});
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
  
    useEffect(() => {
      getDailyPic();
    }, []);
  
    const getDailyPic = ()=>{
      axios
      .get(webServiceTypes.getPictureOfDay.urlDefault)
      .then((response) => {
        setDayPic(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  
    const image = {
      uri: dayPic.hdurl,
    };


    return (
      <View style={styles.container}>
        <View style={styles.body}>
            <View style={{flexDirection:"row",justifyContent:"center",marginBottom:-10}}>
                <Text style={{color:"#0B3D91",fontWeight:"bold",fontSize:16 }}>{"Picture Of the Day: "}</Text>
                <IconButton 
                    iconColor="#0B3D91" 
                    style={{bottom:15}} 
                    icon="information-outline" 
                    selected size={24} 
                    onPress={showModal} />
            </View>      

            <ImageBackground
            source={image}
            resizeMode="cover"
            style={{ flex: 0.7, justifyContent: "center" }}
            ></ImageBackground>
            <View style={{paddingTop:20, alignItems:"flex-start"}}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{color:"#0B3D91",fontWeight:"bold",flex:2 }}>{"Copyright: "}</Text>
                    <Text style={{color:"#0B3D91",flex:8 }}>{dayPic.copyright? dayPic.copyright.replace("\n", " "):"Public"}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                    <Text style={{color:"#0B3D91",fontWeight:"bold" }}>{"Date: "}</Text>
                    <Text style={{color:"#0B3D91", }}>{dayPic.date?dayPic.date:"Not Available"}</Text>
                </View>
            </View>
        </View>
  
        <View style={styles.footer}>
          <NavButtons navigation={navigation} value={"home"} setValue={setValue}></NavButtons>        
        </View>
        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}> 
        <View style={{backgroundColor:"white", flexDirection:"row", flex:1,alignItems:"center",justifyContent:"space-between",borderColor:"#0B3D91",borderRadius:20,borderWidth:5}}>
          <Text style={{maxHeight:60,flex:5,paddingLeft:10, fontSize:18,color:"#0B3D91",fontWeight:"bold"}}>{dayPic.title?dayPic.title:"Picture Details"}</Text>
          <IconButton
              style={{flex:1,}}
              icon="close-circle-outline"
              iconColor="#0B3D91"
              size={30}
              onPress={hideModal}
            />   
        </View>
        <View style={{flex:8,paddingTop:30}}>
        <ScrollView>
          <Text style={{fontSize:18,textAlign: 'justify'}}>{'\t\t'}{dayPic.explanation?dayPic.explanation:"Not Available"}</Text>
        </ScrollView>
        </View>
        <View style={{flex:2}}></View>
        </Modal>
      </Portal>
      </View>
    );
  }

  export default Home