
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
  import MainStackfrom from "../src/routes/mainStack";

  const baseApp=()=> {
    
    return (
     <MainStackfrom></MainStackfrom>
    );
  }
  
  export default baseApp