
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#EDEDED"
    },
    body: {
      flex: 8,
      justifyContent: "center"
    },
    footer:{
      backgroundColor:"#F5F5F5",
      justifyContent:"center",
      alignContent:"stretch",
      flex: 1,
    },
    buttonContainer:{
      paddingTop:5,
      flex: 1,
      width:"80%",
      alignSelf:"center",
    },
    buttonContainerTitle:{
      paddingBottom:5,
      fontSize:14,
      fontWeight:"bold",
      textAlign:"center",
      fontStyle:"italic",
      color:"#0B3D91"
    },
    buttonStyle:{
      //color:"#0B3D91",
      //borderColor:"#0B3D91",
      //borderWidth:3,
      //borderRadius:10
    },
    modalContainer:{
      backgroundColor: '#EDEDED',
      padding: 20,
      flex:1
    } 
  
  });