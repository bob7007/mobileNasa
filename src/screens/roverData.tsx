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

  const RoverData=({ navigation })=>{
    //const [value, setValue] = React.useState('');

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

  export default RoverData