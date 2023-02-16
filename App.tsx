
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [roverData, setRoverData] = useState([]);
  const [curiosity, setCuriosity] = useState([]);
  const [opportunity, setOpportunity] = useState([]);
  const [spirit, setSpirit] = useState([]);
  const [dayPic, setDayPic] = useState({});

  //https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY
    //"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=5&api_key=DEMO_KEY";

  const apiAuth="DEMO_KEY";
  const baseUrl = "https://api.nasa.gov/";
  const serviceType = "mars-photos/api/v1/rovers/";

  const getCuriosityURL=`${baseUrl}${serviceType}curiosity/latest_photos?page=1&api_key=${apiAuth}`;
  const getOpportunityyURL=`${baseUrl}${serviceType}curiosity/latest_photos?page=1&api_key=${apiAuth}`;
  const getspiritURL=`${baseUrl}${serviceType}curiosity/latest_photos?page=1&api_key=${apiAuth}`;
  const getPerseverance=`${baseUrl}${serviceType}curiosity/latest_photos?page=1&api_key=${apiAuth}`;
  const getPictureOfDay=`https://api.nasa.gov/planetary/apod?api_key=${apiAuth}`;

  const testUrl = {hdurl:"https://apod.nasa.gov/apod/image/2302/ABELL1060_LRGB_NASA.jpg",}
  //setDayPic(testUrl);

  useEffect(() => {
    //getDailyPic();
    setDayPic(testUrl);
    console.log("sd");
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

//console.log("image",dayPic);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      
      <ImageBackground
        //source={roverData.photos[1].img_src}
        source={image}
        resizeMode="cover"
        style={{ flex: 8, justifyContent: "center" }}
      ></ImageBackground>

      <View style={styles.footer}>
      
        <View style={styles.buttonContainer}>
            <Text style={styles.buttonContainerTitle}>ROVER DATA</Text>
            <Button onPress={checkData} title="Curiosity"/>
            <Button onPress={checkData} title="Oportunity"/>
            <Button onPress={checkData} title="Spirit"/>
            <Button onPress={checkData} title="Persevarance"/>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor:"grey",
    flex: 1,
  },
  footer:{
    backgroundColor:"grey",
    justifyContent:"center",
    alignContent:"stretch",
    flex: 3,
  },
  buttonContainer:{
    //flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:"grey",
    flex: 1,
  },
  buttonContainerTitle:{
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center"
    
  }


});
