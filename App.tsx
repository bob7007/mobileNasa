
import 'react-native-gesture-handler';
import * as React from 'react';
import BaseApp from "./src/baseApp";
import { Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import {expo} from './app.json';



export default function App() {


//console.log("image",dayPic);
// <Switch value={true} onValueChange={()=>console.log("ddffd")}></Switch>
  return (

    <PaperProvider>
      <BaseApp />
    </PaperProvider>

    
  );
}

AppRegistry.registerComponent(expo.name, () => App);
