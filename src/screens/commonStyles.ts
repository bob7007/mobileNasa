
import {StyleSheet,Dimensions} from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#EDEDED"
    },
    body: {
      flex: 8,
      justifyContent: "center",
      padding:10,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#F5F5F5",
      justifyContent: "center",
      alignContent: "stretch",
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
      flex:12
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
      //marginTop:-24,
      backgroundColor:"#EDEDED"
      
    },
    tableItemTitle:{
      fontWeight:"bold",
      color:"black",
      fontSize:16,
    },
    tableItemTitleAlternate:{
      fontWeight:"bold",
      color:"#F5F5F5",
      fontSize:16,
      //backgroundColor:"#a2a6e4",
      backgroundColor:"#0B3D91",
    },
    tableItemValue:{
      color:"black",
      fontSize:16,
      //fontStyle:"italic",
    },
    tableItemValueAlternate:{
      color:"#F5F5F5",
      fontSize:16,
      //backgroundColor:"#a2a6e4",
      backgroundColor:"#0B3D91",
      //fontStyle:"italic",
    },
    modalImageStyle:{
      backgroundColor:"#F5F5F5",
      flex:5,
      width: "100%",
      height: "100%",
      marginBottom:20
    }
  
  });