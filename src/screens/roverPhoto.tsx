import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions
  } from "react-native";
  //import { WebView } from 'react-native-webview';
  import { Dropdown } from 'react-native-element-dropdown';
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import {HelperText,TextInput,RadioButton,Divider,Modal,Portal,Provider,Switch,Button,SegmentedButtons,Snackbar,IconButton,DataTable,Checkbox} from 'react-native-paper';
  import {NavButtons} from "../components/navButtons";
  import {styles} from "../screens/commonStyles";
  import {webServiceTypes, apiAuth} from "../services/serviceType";
  import {roverPhotoURl} from "../utility"

  const RoverPhoto=({ navigation })=>{
    const [value, setValue] = React.useState('');
    const [roverPhoto, setRoverPhoto] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem,setModalItem]=useState([]);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [drpValue,setDrpValue]=useState("curiosity");
    const [isFocus, setIsFocus] = useState(false);
    const [isLatest, setIsLatest] = useState(true);
    const [dateType, setDateType] = useState('earth');
    const [marsDate, setMarsDate] = useState("1000");
    const [earthDate, setEarthDate] = useState("");


    const getDefaultRoverPhoto = () => {
      let url = roverPhotoURl(true,"curiosity");
        axios
          .get(url)
          .then((response) => {
            setRoverPhoto(response.data.latest_photos);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const getRoverPhoto = (url:string) => {
          axios
            .get(url)
            .then((response) => {
              isLatest?
              setRoverPhoto(response.data.latest_photos):
              setRoverPhoto(response.data.photos);
            })
            .catch((err) => {
              console.log(err);
            });
        };

    useEffect(()=>{
        getDefaultRoverPhoto();
        console.log(webServiceTypes.getPerseverancePhotos.urlDefault);

    },[]);

    const handleClick = (item) => {
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
    
      const roverOptions = [
        { label: 'Curiosity', value: 'curiosity' },
        { label: 'Opportunity', value: 'opportunity' },
        { label: 'Spirit', value: 'spirit' },
        { label: 'Perseverance', value: 'perseverance' },
      ];



      const marsDateHasErrors = () => {
        let error = false;
        error = !(/^\d+$/.test(marsDate));
        if(!error&&marsDate==="0"||!error&&marsDate.charAt(0)==="0"){
          error=true;
        }
        return error;
      };

      const search=()=>{ 
        let date = dateType==="mars"?marsDate:earthDate;
        let url = roverPhotoURl(isLatest,drpValue,dateType,date);
        console.log("xxx",url);
        //getRoverPhoto(url);
      }


    return(
    <View style={styles.container}>
        <View style={styles.body}>
          <View style={{flex:2,paddingTop:30}}>
            <View style={{paddingBottom:10, flexDirection:"row",justifyContent:"space-between",flex:2}}>
              <View style={{flex:1}}>
                <Dropdown
                  //selectedTextStyle={styles.selectedTextStyle}
                  //iconStyle={styles.iconStyle}
                  style={[styles2.dropdown,isFocus && { borderColor: 'red' }]}
                  placeholderStyle={styles2.placeholderStyle}
                  selectedTextStyle={styles2.placeholderStyle}
                  iconColor={"black"}
                  itemTextStyle={[styles2.placeholderStyle]}
                  containerStyle={[styles2.dropDownContainerStyle]}
                  data={roverOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Curiosity"}
                  activeColor='inherit'
                  value={drpValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    console.log(item);
                    setDrpValue(item.value);
                    setIsFocus(false);
                  }}
                />           
                <View style={{flexDirection:"row"}}>
                    <Checkbox
                      status={isLatest ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setIsLatest(!isLatest);
                      }}
                    />
                    <Text style={{paddingTop:7,fontWeight:"bold",fontSize:14}}>Latest Pictures</Text>
                </View>

                  <RadioButton.Group onValueChange={newDate => setDateType(newDate)} value={dateType}>
                  {!isLatest?
                  <View style={{flexDirection:"column"}}>
                    <View style={{flexDirection:"row"}}>
                      <RadioButton value="earth" />
                      <Text style={{paddingTop:7,fontWeight:"bold",fontSize:14}}>Earth Date</Text>
                    </View>
                    <View style={{flexDirection:"row",bottom:5}}>
                      <RadioButton value="mars" />
                      <Text style={{paddingTop:7,fontWeight:"bold",fontSize:14}}>Mars Date</Text>
                    </View>
                  </View>
                  :<></>
                }
                </RadioButton.Group>

              </View>
              <View style={{flex:1}}>
              <Button 
                style={{width:"100%",borderRadius: 8}}
                icon="magnify" 
                mode="outlined" 
                buttonColor='#0B3D91'
                textColor='white'
                onPress={search}>
                {"Search"}
              </Button>
            
                {dateType==="mars"&&!isLatest?
              <View>
                <TextInput
                  mode="outlined"
                  outlineColor="black"
                  label="Mars Date - (Sol)"
                  value={marsDate}
                  onChangeText={sol => setMarsDate(sol)}
                /> 
                <HelperText type="error" visible={marsDateHasErrors()}>
                  Mars Date must be a number.
                </HelperText>
              </View>
              :<></>
              }

              </View> 
            </View>
           

          </View>
          <View style={{flex:7}}>
            <FlatList
                data={roverPhoto}
                style={styles2.container}
                renderItem={renderItem}
                numColumns={3}
              />
          </View>
        </View>

        <View style={styles.footer}>
        <NavButtons navigation={navigation} value={"gallery"} setValue={setValue}></NavButtons>        
        </View>

        <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Image source={{uri: modalItem.img_src?modalItem.img_src:""}} resizeMode="contain" style={{flex:1,width: "100%", height: "100%"}}/>
          <View style={{flex:1,width:"80%",paddingTop:50 }}>
          <DataTable >
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight:"bold",color:"#0B3D91"}}>Rover:</DataTable.Cell>
              <DataTable.Cell>{modalItem?.rover?.name?modalItem.rover.name:""}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight:"bold",color:"#0B3D91"}}>Status:</DataTable.Cell>
              <DataTable.Cell>{modalItem?.rover?.status?modalItem.rover.status:""}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight:"bold",color:"#0B3D91"}}>Landing Date:</DataTable.Cell>
              <DataTable.Cell>{modalItem?.rover?.landing_date?modalItem.rover.landing_date:""}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight:"bold",color:"#0B3D91"}}>Launch Date:</DataTable.Cell>
              <DataTable.Cell>{modalItem?.rover?.launch_date?modalItem.rover.launch_date:""}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight:"bold",color:"#0B3D91"}}>Camera:</DataTable.Cell>
              <DataTable.Cell>{modalItem?.camera?.full_name?modalItem.camera.full_name:""}</DataTable.Cell>
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
    dropdown: {
      backgroundColor:"#F5F5F5",
      height: 43,
      width:"100%",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      color: "black",
    },
    placeholderStyle: {
      //...fontStyle.book14,
      color: "black",
    },
    dropDownContainerStyle: {
      color:"black",
      borderColor: "black",
      borderWidth: 0.5,
      borderRadius: 4,
    },
  });