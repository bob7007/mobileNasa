import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
  //import * as React from 'react';
  import React, { useState, useEffect,useRef } from "react";
  import axios from "axios";
  import {Modal,Portal,Provider, Switch,Button, SegmentedButtons,Snackbar ,IconButton    } from 'react-native-paper';
  import {NavButtons} from "../components/navButtons";
  import {styles} from "../screens/commonStyles"; 
  import { useNavigation } from "@react-navigation/native";
  import { WebView } from 'react-native-webview';
  import { Dropdown } from 'react-native-element-dropdown';
  import {roverManifest} from "../utility"
  import  DataTable from "../components/dataTable";

  const RoverData=({ navigation })=>{
    const [value, setValue] = React.useState('');
    const [drpValue,setDrpValue]=useState("curiosity");
    const [isFocus, setIsFocus] = useState(false);
    const [telemetry,setTelemetry]=useState([])
    const [photoData,setPhotoData]=useState([])
    const roverOptions = [
        { label: 'Curiosity', value: 'curiosity' },
        { label: 'Opportunity', value: 'opportunity' },
        { label: 'Spirit', value: 'spirit' },
        { label: 'Perseverance', value: 'perseverance' },
      ];

    const getTelemetry = (url:string) => {
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          setTelemetry(response.data.photo_manifest); 
          setPhotoData(response.data.photo_manifest.photos);        
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(()=>{
      let url = roverManifest("curiosity");
      //console.log("URL",url);
      getTelemetry(url);
    },[]);


    const search=()=>{
      let url ="";
      url = roverManifest(drpValue);
      getTelemetry(url);
      console.log(url);
    }

    const [page,setPage]=useState(1);

    return(
    <View style={styles.container}>
        <View style={styles.body}>
          <View style={{ paddingBottom:10, flexDirection:"row",justifyContent:"space-between",flex:1}}>
            <View style={{flex:1,padding:20}}>
              <Dropdown
                      //selectedTextStyle={styles.selectedTextStyle}
                      //iconStyle={styles.iconStyle}
                      style={[styles.dropdown,isFocus && { borderColor: '#fc3d21'}]}
                      placeholderStyle={styles.drpPlaceholderStyle}
                      selectedTextStyle={styles.drpSelectedStyle}
                      iconColor={"black"}
                      itemTextStyle={[styles.drpPlaceholderStyle]}
                      containerStyle={[styles.dropDownContainerStyle]}
                      activeColor="#F5F5F5"
                      data={roverOptions}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={"Curiosity"}
                      
                      value={drpValue}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setDrpValue(item.value);
                        setIsFocus(false);
                      }}
                    />
            </View>
            <View>
              
            </View>
            <View style={{flex:1,padding:20}}>
                <Button 
                  style={{width:"100%",borderRadius: 8,minHeight:45}}
                  icon="magnify" 
                  mode="outlined" 
                  buttonColor='#0B3D91'
                  textColor='white'
                  onPress={search}>
                  Search
                </Button>    
            </View>
          </View>
          <View style={{flex:2,backgroundColor:"#F5F5F5", flexDirection:"row"}}>
          <View style={{flex:1}}>
              <Text style={[styles.tableItemTitle,{paddingLeft:30}]}>Total Photos:</Text>
              <Text style={[styles.tableItemTitleAlternate,{paddingLeft:30}]}>Status:</Text>
              <Text style={[styles.tableItemTitle,{paddingLeft:30}]}>Max Sol:</Text>
              <Text style={[styles.tableItemTitleAlternate,{paddingLeft:30}]}>Max Earth Date</Text>
              <Text style={[styles.tableItemTitle,{paddingLeft:30}]}>Launch Date:</Text>
              <Text style={[styles.tableItemTitleAlternate,{paddingLeft:30}]}>Landing Date:</Text>
            </View>
          
            <View style={{flex:1,}}>
              <Text style={[styles.tableItemValue,{paddingLeft:30}]}>{telemetry?.total_photos?telemetry.total_photos:""}</Text>
              <Text style={[styles.tableItemValueAlternate,{paddingLeft:30}]}>{telemetry?.status?telemetry.status:""}</Text>
              <Text style={[styles.tableItemValue,{paddingLeft:30}]}>{telemetry?.max_sol?telemetry.max_sol:""}</Text>
              <Text style={[styles.tableItemValueAlternate,{paddingLeft:30}]}>{telemetry?.max_date?telemetry.max_date:""}</Text>
              <Text style={[styles.tableItemValue,{paddingLeft:30}]}>{telemetry?.launch_date?telemetry.launch_date:""}</Text>
              <Text style={[styles.tableItemValueAlternate,{paddingLeft:30}]}>{telemetry?.landing_date?telemetry.landing_date:""}</Text>
            </View>
          </View>
          <View style={{flex:5}}>
              <DataTable data={photoData}></DataTable>
          </View>
        </View>

        <View style={styles.footer}>
            <NavButtons navigation={navigation} value={"telemetrics"} setValue={setValue}></NavButtons>        
        </View>
    </View>
    );

  }

  export default RoverData