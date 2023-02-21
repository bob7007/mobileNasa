import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Dimensions,
    PixelRatio,
  } from "react-native";
  //import { WebView } from 'react-native-webview';
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import {Modal,Portal,Provider, Switch,Button, SegmentedButtons,Snackbar ,IconButton,DataTable     } from 'react-native-paper';
  import {NavButtons} from "../components/navButtons";
  import {styles} from "../screens/commonStyles";
  import {webServiceTypes, apiAuth} from "../services/serviceType";

  const RoverPhoto=({ navigation })=>{
    const [value, setValue] = React.useState('');
    const [curiosity, setCuriosity] = useState([]);
    const [opportunity, setOpportunity] = useState([]);
    const [spirit, setSpirit] = useState([]);
    const [perseverance, setPerseverance] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem,setModalItem]=useState([]);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);


    const getPerseveranceData = () => {
        axios
          .get(webServiceTypes.getPerseverancePhotos.urlDefault)
          .then((response) => {
            console.log(response.data);
            setPerseverance(response.data);
    
          })
          .catch((err) => {
            console.log(err);
          });
      };

    useEffect(()=>{
        //setPerseverance(props.route.params.defaultPhotos.latest_photos);
        //console.log("perseverance: ",props.route.params.defaultPhotos.latest_photos);
        getPerseveranceData();
        console.log(webServiceTypes.getPerseverancePhotos.urlDefault);

    },[]);

    const handleClick = (item) => {
      //console.log(event,event.currentTarget.id);

      setModalItem(item);
      setModalVisible(true);
      console.log(item,modalItem);
      
    };
    
      const renderItem = ({ item, index }) => {
        if (item.empty === true) {
          return <View style={[styles2.item, styles2.itemInvisible]} />;
        }
        return (
          <View
            style={styles2.item}
          >
            <TouchableOpacity onPress={()=>{handleClick(item)}}>
              <Image source={{uri: item.img_src}} style={{width: 120, height: 120}} />
            </TouchableOpacity>
            
          </View>
        );
      };
    
      console.log("data: ",perseverance);

    return(
    <View style={styles.container}>
        <View style={styles.body}>
        <FlatList
            data={perseverance.latest_photos}
            style={styles2.container}
            renderItem={renderItem}
            numColumns={3}
          />
        </View>

        <View style={styles.footer}>
        <NavButtons navigation={navigation} value={"gallery"} setValue={setValue}></NavButtons>        
        </View>
        <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          
          <Image source={{uri: modalItem.img_src}} resizeMode="contain" style={{flex:1,width: "100%", height: "100%"}}/>

          <View style={{flex:1,width:"80%",paddingTop:50 }}>
          <DataTable >
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight:"bold",color:"#0B3D91"}}>Rover:</DataTable.Cell>
              <DataTable.Cell>{modalItem.rover.name}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight:"bold",color:"#0B3D91"}}>Status:</DataTable.Cell>
              <DataTable.Cell>{modalItem.rover.status}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight:"bold",color:"#0B3D91"}}>Landing Date:</DataTable.Cell>
              <DataTable.Cell>{modalItem.rover.landing_date}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight:"bold",color:"#0B3D91"}}>Launch Date:</DataTable.Cell>
              <DataTable.Cell>{modalItem.rover.launch_date}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight:"bold",color:"#0B3D91"}}>Camera:</DataTable.Cell>
              <DataTable.Cell>{modalItem.camera.full_name}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>		
          </View>
          <View style={{flexDirection:"row"}}>
              <Button 
                style={{width:"50%"}}
                icon="close-circle-outline" 
                mode="outlined" 
                buttonColor='#0B3D91'
                textColor='white'
                onPress={hideModal}>
                {"Close"}
              </Button>
              <Button 
                style={{width:"50%"}}
                icon="close-circle-outline" 
                mode="outlined" 
                buttonColor='#0B3D91'
                textColor='white'
                onPress={hideModal}>
                {"Download"}
              </Button>
          </View>
        </Modal>
      </Portal>
    </View>
    );

  }

  export default RoverPhoto;


  const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 20,
    },
    item: {
      //backgroundColor: '#4D243D',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width / 3, // approximate a square
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
    itemText: {
      color: '#fff',
    },
  });