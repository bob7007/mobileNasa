
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


  const Home=({ navigation })=> {
    const [value, setValue] = React.useState('home');
    const [roverData, setRoverData] = useState([]);
    const [curiosity, setCuriosity] = useState([]);
    const [opportunity, setOpportunity] = useState([]);
    const [spirit, setSpirit] = useState([]);
    const [dayPic, setDayPic] = useState({});
  
    //https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY
      //"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=5&api_key=DEMO_KEY";
  
    const apiAuth="xl9FXRAWCfxyLuDXx08avlBlQj4uJCRUrqFNBFPA";
    const baseUrl = "https://api.nasa.gov/";
    const serviceType = "mars-photos/api/v1/rovers/";
  
    const getCuriosityURL=`${baseUrl}${serviceType}curiosity/latest_photos?page=1&api_key=${apiAuth}`;
    const getOpportunityURL=`${baseUrl}${serviceType}curiosity/latest_photos?page=1&api_key=${apiAuth}`;
    const getspiritURL=`${baseUrl}${serviceType}curiosity/latest_photos?page=1&api_key=${apiAuth}`;
    const getPerseverance=`${baseUrl}${serviceType}curiosity/latest_photos?page=1&api_key=${apiAuth}`;
    const getPictureOfDay=`https://api.nasa.gov/planetary/apod?api_key=${apiAuth}`;
  
    const testUrl = {
      hdurl:"https://apod.nasa.gov/apod/image/2302/ABELL1060_LRGB_NASA.jpg",
      title: "The Hydra Cluster of Galaxies",
      copyright: "Marco Lorenzi",
      date: "2023-02-16",
      description:"Once upon a midnight dreary, while I pondered weak and weary, O'er volumes of astronomy and forgotten lore, I stumbled upon this snapshot, cosmic and eerie, A sight that filled my heart with awe and more. Two stars, like sentinels, anchored the foreground, Of our Milky Way galaxy, a sight to behold, Beyond them, a cluster of Hydra, galaxies abound, 100 million light-years away, a story to be told. Three large galaxies, ellipticals and a spiral blue, Dominant and grand, each 150,000 light-years wide, But it was the overlapping pair that caught my view, Cataloged as NGC 3314, a sight I cannot hide. Abell 1060, the Hydra galaxy cluster's name, One of three large galaxy clusters close to our Milky Way, A universe bound by gravity, a celestial game, Where clusters align over larger scales, I cannot sway. At a distance of 100 million light-years, this snapshot's size, 1.3 million light-years across, a cosmic delight, A momentary glimpse into the universe's guise, But even this shall fade, and be nevermore in sight.",
    }
  
    useEffect(() => {
      getDailyPic();
      //setDayPic(testUrl);

    }, []);
  
    const getDailyPic = ()=>{
      axios
      .get(getPictureOfDay)
      .then((response) => {
        setDayPic(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  
    const getData = () => {
      axios
        .get(getCuriosityURL)
        .then((response) => {
          //console.log(response.data);
          setRoverData(response.data);
  
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const checkData = () => {
      console.log("CuriosityData", curiosity);
      console.log("Opportunity", opportunity);
      console.log("Spirit", spirit);
    };
  
    const image = {
      uri: dayPic.hdurl,
    };
    

    const gallery=()=>{
      console.log("test",value);
      navigation.navigate('RoverPhoto');
    }
    const data=()=>{
      console.log("datas",value);
      navigation.navigate('RoverData'); 
    }

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    return (
      <View style={styles.container}>
        <View style={styles.body}>
            <View style={{flexDirection:"row",justifyContent:"center"}}>
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
            //source={roverData.photos[1].img_src}
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
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text style={{fontSize:18}}>{dayPic.explanation?dayPic.explanation:"Not Available"}</Text>
        </Modal>
      </Portal>
      </View>
    );
  }
  //backgroundColor:"#EDEDED", 

  
  export default Home