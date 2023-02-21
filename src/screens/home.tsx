
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import {Modal,Portal,Provider, Switch,Button, SegmentedButtons,Snackbar ,IconButton    } from 'react-native-paper';
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
   
    const testUrl = {
      hdurl:"https://apod.nasa.gov/apod/image/2302/ABELL1060_LRGB_NASA.jpg",
      title: "The Hydra Cluster of Galaxies",
      copyright: "Marco Lorenzi",
      date: "2023-02-16",
      description:"Once upon a midnight dreary, while I pondered weak and weary, O'er volumes of astronomy and forgotten lore, I stumbled upon this snapshot, cosmic and eerie, A sight that filled my heart with awe and more. Two stars, like sentinels, anchored the foreground, Of our Milky Way galaxy, a sight to behold, Beyond them, a cluster of Hydra, galaxies abound, 100 million light-years away, a story to be told. Three large galaxies, ellipticals and a spiral blue, Dominant and grand, each 150,000 light-years wide, But it was the overlapping pair that caught my view, Cataloged as NGC 3314, a sight I cannot hide. Abell 1060, the Hydra galaxy cluster's name, One of three large galaxy clusters close to our Milky Way, A universe bound by gravity, a celestial game, Where clusters align over larger scales, I cannot sway. At a distance of 100 million light-years, this snapshot's size, 1.3 million light-years across, a cosmic delight, A momentary glimpse into the universe's guise, But even this shall fade, and be nevermore in sight.",
    }
  
    useEffect(() => {
      console.log("dedds",webServiceTypes.getPictureOfDay.urlDefault,apiAuth);
      getDailyPic();
    }, []);
  
    const getDailyPic = ()=>{
      axios
      .get(webServiceTypes.getPictureOfDay.urlDefault)
      .then((response) => {
        setDayPic(response.data);
        console.log(response.data);
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
            <Text style={{color:"#0B3D91",fontStyle:"italic", textAlign:"center", textDecorationLine:"underline"}}>Picture of the day</Text>
            <View style={{flexDirection:"row",justifyContent:"center",marginBottom:-20}}>
                <Text style={{color:"#0B3D91",fontWeight:"bold" }}>{"Title: "}</Text>
                <Text style={{color:"#0B3D91", }}>{dayPic.title?dayPic.title:"Not Available"}</Text>
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
            style={{ flex: 0.5, justifyContent: "center" }}
            ></ImageBackground>
            <View style={{paddingTop:20, flexDirection:"row", justifyContent:"space-around"}}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{color:"#0B3D91",fontWeight:"bold" }}>{"Copyright: "}</Text>
                    <Text style={{color:"#0B3D91", }}>{dayPic.copyright? dayPic.copyright:"Public"}</Text>
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
          <Text style={{fontSize:18}}>{dayPic.explanation?dayPic.explanation:"Not Available"}</Text>
        </Modal>
      </Portal>
      </View>
    );
  }

  export default Home