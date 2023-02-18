import {View, StyleSheet} from "react-native";
import {SegmentedButtons} from 'react-native-paper';
 

interface buttonProps{
    navigation:any;
    value:string;
    setValue: (value: string) => void;
}

export const NavButtons:React.FC<buttonProps> = ({navigation,value="home",setValue})=>{
    console.log("navxx",navigation);
    const gallery=()=>{
        console.log("test",value);
        navigation.navigate('RoverPhoto');
      }
      const data=()=>{
        console.log("data",value);
        navigation.navigate('RoverData'); 
      }

      const home=()=>{
        console.log("home",value);
        navigation.navigate('Home'); 
      }


    return(

        <View style={styles.buttonContainer}>
        <SegmentedButtons
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
              onPress:data,
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