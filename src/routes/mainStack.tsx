import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Modal,Portal,Provider, Switch,Button, SegmentedButtons,Snackbar ,IconButton    } from 'react-native-paper';

import Home from "../screens/home";
import RoverData from "../screens/roverData";
import RoverPhoto from "../screens/roverPhoto";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    
  } from "react-native";
  import React, { useState, useEffect } from "react";
const screens = {
    Home: {
      screen: Home,
    },
    RoverPhoto: {
        screen: RoverPhoto,
      },
    RoverData: {
      screen: RoverData,
    },
  };

  const headerOptions={
    title: 'Home',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#f4511e',
      },
    headerTitleStyle: {
        fontWeight: 'bold',
        color:"#0B3D91", 
        textAlign:"center",
      },

  }

  const headerLogo=(navigation,routes)=>{

    return(
        <View style={{flexDirection:"row"}}>

            <IconButton 
            iconColor="#0B3D91" 
            style={{}} 
            icon="rocket-launch-outline" 
            selected size={24} 
            onPress={()=>{navigation.navigate('Home')}}
            />
            <Text style={{color:"#0B3D91",fontWeight:"bold",paddingTop:20}}>Home</Text>
        </View>
    );
  }


  const headerLogo2=(navigation,routes)=>{
    const buttonTitle="Home";
    return(
        <View style={{}}>
            <Button 
            icon="rocket-launch-outline" 
            mode="outlined" 
            buttonColor='#0B3D91'
            textColor='white'
            //contentStyle={{borderColor:"red",borderRadius:10,backgroundColor:"red"}}
            onPress={() => {navigation.navigate('Home')}}>
                {buttonTitle}
            </Button>
        </View>
    );
  }
      //color:"#0B3D91",
      //borderColor:"#0B3D91",
      //borderWidth:3,
      //borderRadius:10

      
  
const Stack = createStackNavigator();

const mainStack=()=> {
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="Home" 
                component={Home} 
                options={({ navigation, route }) =>({
                    headerTitle: (props) => headerLogo2(navigation, route),
                    headerStyle: {backgroundColor: '#F5F5F5',},
                })}/>
                <Stack.Screen 
                name="RoverPhoto" 
                component={RoverPhoto}
                options={({ navigation, route }) =>({
                    headerTitle: (props) => headerLogo2(navigation, route),
                    headerLeft: ()=> null,
                })} />
                <Stack.Screen 
                name="RoverData" 
                component={RoverData}
                options={({ navigation, route }) =>({
                    headerTitle: (props) => headerLogo2(navigation, route),
                    headerLeft: ()=> null,
                })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
  }

export default mainStack
