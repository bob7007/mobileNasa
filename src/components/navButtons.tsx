import {View, StyleSheet} from "react-native";
import {SegmentedButtons,MD2LightTheme,MD3LightTheme,useTheme } from 'react-native-paper'; 

interface buttonProps{
    navigation:any;
    value:string;
    setValue: (value: string) => void;
}

export const NavButtons:React.FC<buttonProps> = ({navigation,value="home",setValue})=>{
    
    const gallery=()=>{
        navigation.navigate('RoverPhoto');
      }
      const telemetrics=()=>{
        
        navigation.navigate('RoverData'); 
      }

      const home=()=>{
        navigation.navigate('Home'); 
      }

      const theme = useTheme();
    return(

        <View style={styles.buttonContainer}>
        <SegmentedButtons
          theme={MD3LightTheme}
          style={styles.buttonStyle}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
                value: 'home',
                label: 'Home',
                icon:"home-circle-outline",
                onPress:home,
                //showSelectedCheck:value==="gallery"?true:false,
            },
            {
              value: 'gallery',
              label: 'Gallery',
              icon:"view-gallery-outline",
              onPress:gallery,
              //showSelectedCheck:value==="gallery"?true:false,
            },
            {
              value: 'telemetrics',
              label: 'Telemetrics',
              icon:"file-table-outline",
              onPress:telemetrics,
              //showSelectedCheck:value==="telemetrics"?true:false,
            },
          ]}
        />
      </View>

    );


}


 
const styles = StyleSheet.create({
    buttonContainer:{
      width:"90%",
      alignSelf:"center",
    },
    buttonStyle:{
        //backgroundColor:"#0B3D91",
      //borderColor:"#0B3D91",
      //borderWidth:3,
      //borderRadius:10
    }, 
  
  });