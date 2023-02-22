
import {StyleSheet,Dimensions} from "react-native";

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
    },
    galleryContainer: {
      flex: 1,
      marginVertical: 20,
    },
    galleryItem: {
      //backgroundColor: '#4D243D',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width / 3, // approximate a square
    },
    galleryItemInvisible: {
      backgroundColor: 'transparent',
    },
    itemText: {
      color: '#fff',
    },
    dropdown: {
      backgroundColor:"#F5F5F5",
      height: 43,
      width:"100%",
      borderColor: "#0B3D91",
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      color: "black",
    },
    drpPlaceholderStyle: {
      //...fontStyle.book14,
      color: "black",
      fontSize:14,
    },
    drpSelectedStyle: {
      //...fontStyle.book14,
      color: "black",
      fontSize:14,
      fontWeight:"bold",
    },
    dropDownContainerStyle: {
      color:"black",
      borderColor: "#fc3d21",
      borderWidth: 2,
      borderRadius: 8,
      marginTop:-24,
      backgroundColor:"#EDEDED"
      
    }, 
  
  });