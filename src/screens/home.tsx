
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
 

  const home=({ navigation })=> {
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
    const getOpportunityyURL=`${baseUrl}${serviceType}curiosity/latest_photos?page=1&api_key=${apiAuth}`;
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
    //setDayPic(testUrl);
  
    useEffect(() => {
      //getDailyPic();
      setDayPic(testUrl);

    }, []);
  
    const getDailyPic = ()=>{
      axios
      .get(getPictureOfDay)
      .then((response) => {
        setDayPic(response.data);
        console.log(response.data.hdurl);
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
    const [value, setValue] = React.useState('');

    const gallery=()=>{
      console.log("test",value);
      navigation.navigate('RoverPhoto');
    }
    const data=()=>{
      console.log("data",value);
      navigation.navigate('RoverData'); 
    }

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:"#EDEDED", flex: 8, justifyContent: "center" }}>
        <View style={{flexDirection:"row",justifyContent:"center"}}>
          <Text style={{color:"#0B3D91", }}>{dayPic.title}</Text>
          <IconButton iconColor="#0B3D91" style={{bottom:15}} icon="information-outline" selected size={24} onPress={showModal} />
        </View>

        <ImageBackground
          //source={roverData.photos[1].img_src}
          source={image}
          resizeMode="cover"
          style={{ flex: 0.5, justifyContent: "center" }}
        ></ImageBackground>
        <View style={{paddingTop:20, flexDirection:"row", justifyContent:"space-around"}}>
          <Text style={{color:"#0B3D91", textAlign:"center"}}>{dayPic.copyright}</Text>
          <Text style={{color:"#0B3D91", textAlign:"center"}}>{dayPic.date}</Text>
        </View>
        
        </View>
  
        <View style={styles.footer}>
        
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonContainerTitle}>Rover Datax</Text>
            <SegmentedButtons
              style={styles.buttonStyle}
              value={value}
              onValueChange={setValue}
              buttons={[
                {
                  value: 'gallery',
                  label: 'Gallery',
                  icon:"view-gallery-outline",
                  onPress:gallery,
                  //showSelectedCheck:value==="gallery"?true:false,
                },
                {
                  value: 'telemetrics',
                  label: 'Telemetrics',
                  icon:"file-table-outline",
                  onPress:data,
                  //showSelectedCheck:value==="telemetrics"?true:false,
                },
              ]}
            />
          </View>
          
        </View>
        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>{dayPic.description}</Text>
        </Modal>
      </Portal>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor:"red"
    },
    footer:{
      backgroundColor:"#EDEDED",
      justifyContent:"center",
      alignContent:"stretch",
      flex: 2,
    },
    buttonContainer:{
      //flexDirection:"row",
      //justifyContent:"center",
      //backgroundColor:"#EDEDED",
      
      paddingTop:5,
      flex: 1,
      width:"80%",
      alignSelf:"center",
    },
    buttonContainerTitle:{
      paddingBottom:5,
      fontSize:14,
      fontWeight:"bold",
      textAlign:"center",
      fontStyle:"italic",
      color:"#0B3D91"
    },
    buttonStyle:{
      //color:"#0B3D91",
      //borderColor:"#0B3D91",
      //borderWidth:3,
      //borderRadius:10
    }, 
  
  });
  
  export default home