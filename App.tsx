
import 'react-native-gesture-handler';
import * as React from 'react';
import BaseApp from "./src/baseApp";
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import appConfig from './app.json';


export default function App() {

  const theme = useTheme();
//console.log("image",dayPic);
// <Switch value={true} onValueChange={()=>console.log("ddffd")}></Switch>
  return (

    <PaperProvider >
      <BaseApp />
    </PaperProvider>

    
  );
}

AppRegistry.registerComponent(appConfig.expo.name, () => App);
