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

  const RoverPhoto=({ navigation })=>{
    const [value, setValue] = React.useState('');
    //console.log("wddw",props.route.params.value,navigation);
    //const value = props.route.params.value;
    //const setValue = props.route.params.setValue;
    //console.log("xxxx",value,setValue);
    return(
    <View style={styles.container}>
        <View style={styles.body}>

        </View>

        <View style={styles.footer}>
        <NavButtons navigation={navigation} value={value} setValue={setValue}></NavButtons>        
        </View>
    </View>
    );

  }

  export default RoverPhoto;