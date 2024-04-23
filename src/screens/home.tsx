import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    Linking,
    TouchableOpacity
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import {Modal,Portal,Provider, Switch,Button, SegmentedButtons,Snackbar ,IconButton,Divider} from 'react-native-paper';
  import {NavButtons} from "../components/navButtons";
  import {styles} from "../screens/commonStyles";
  import {webServiceTypes, apiAuth} from "../services/serviceType";
  import { Video, ResizeMode } from 'expo-av';

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

    const openYoutubeVideo = () => {
      Linking.openURL(dayPic.url);
    };

    const extractVideoId = (url) => {
      const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    };
    
    const generateThumbnailUrl = (videoId) => {
      return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    };

    const generateTitleOfDay = () =>{
      let title = "";
      if(dayPic.media_type === "image"){
        title = "Picture Of the Day: ";
      }else if(dayPic.media_type === "video"){
        title = "Video Of the Day: ";
      }else{
        title = "Content Of the Day: ";
      }

      return title;
    };

    const defaultImageWidth = 200;
    const defaultImageHeight = 200; 

    const defaultImageUrl = "https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg";
    const mediaContent = () => {
      //const isYoutubeVideo = (url) => url.includes("youtube");
      if (dayPic.media_type === "image") {
        return (
          <ImageBackground
            source={{ uri: dayPic.url }}
            resizeMode="cover"
            style={{ flex: 0.7, justifyContent: "center" }}
          ></ImageBackground>
        );
      }else if (dayPic.media_type === "video" && dayPic.url.includes("youtube")) {
        const videoId = extractVideoId(dayPic.url);
        if (videoId) {
          const thumbnailUrl = generateThumbnailUrl(videoId);
          return (
              <ImageBackground
                source={{ uri: thumbnailUrl }}
                resizeMode="cover"
                style={{ flex: 0.7, justifyContent: "center" }}
              >                
              <IconButton
                icon="play-circle"
                iconColor={'#E10600'}
                size={60}
                style={{ position: 'absolute', alignSelf: 'center', top: '45%' }}
                onPress={() => Linking.openURL(dayPic.url)} 
              />
              </ImageBackground>
          );
        } else {
          return (
            <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}>
              <ImageBackground
                source={{ uri: defaultImageUrl }}
                resizeMode="cover"
                style={{ width: defaultImageWidth, height: defaultImageHeight }}
              ></ImageBackground>
            </View>
          );
        }
      }else if (dayPic.media_type === "video" && dayPic.url.includes("mp4")) {
        return (
          <Video
          source={{ uri: dayPic.url }}
          style={{ flex: 0.7, justifyContent: 'center' }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
        );
      }else{
        return (
          <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}>
            <ImageBackground
              source={{ uri: defaultImageUrl }}
              resizeMode="cover"
              style={{ width: defaultImageWidth, height: defaultImageHeight }}
            ></ImageBackground>
          </View>
        );
      }
    };


    return (
      <View style={styles.container}>
        <View style={styles.body}>
            <View style={{flexDirection:"row",justifyContent:"center",marginBottom:-10}}>
                <Text style={{color:"#0B3D91",fontWeight:"bold",fontSize:16 }}>{generateTitleOfDay()}</Text>
                <IconButton 
                    iconColor="#0B3D91" 
                    style={{bottom:15}} 
                    icon="information-outline" 
                    selected size={24} 
                    onPress={showModal} />
            </View>      
            {mediaContent()}
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
          <Text style={{maxHeight:60,flex:5,paddingLeft:10, fontSize:18,color:"#0B3D91",fontWeight:"bold"}}>{dayPic.title?dayPic.title:"Content Details"}</Text>
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