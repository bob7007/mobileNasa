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

  
const Stack = createStackNavigator();

const mainStack=()=> {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="Home" 
                component={Home} 
                options={({ navigation, route }) =>({
                    headerTitle: (props) => headerLogo(navigation, route)
                })}/>
                <Stack.Screen 
                name="RoverPhoto" 
                component={RoverPhoto}
                options={({ navigation, route }) =>({
                    headerTitle: (props) => headerLogo(navigation, route)
                })} />
                <Stack.Screen name="RoverData" component={RoverData} />
            </Stack.Navigator>
        </NavigationContainer>
    );
  }

export default mainStack
