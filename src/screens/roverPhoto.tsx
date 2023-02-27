import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Keyboard
  } from "react-native";
  import { WebView } from 'react-native-webview';
  import { Dropdown } from 'react-native-element-dropdown';
  import React, { useState, useEffect,useRef } from "react";
  import axios from "axios";
  import {HelperText,TextInput,RadioButton,Divider,Modal,Portal,Button,IconButton,Checkbox, MD3LightTheme,ActivityIndicator, MD2Colors} from 'react-native-paper';
  import {NavButtons} from "../components/navButtons";
  import {styles} from "../screens/commonStyles";
  import {roverPhotoURl} from "../utility"
  import DateTimePicker from '@react-native-community/datetimepicker';
  import { useNavigation } from "@react-navigation/native";
  import hazard from "../assets/hazard.png"
  import rover from "../assets/rover.png"

  const RoverPhoto=({ navigation })=>{
    const webviewRef = useRef(null);
    const nav = navigation;
    const navi = useNavigation();
    const [value, setValue] = React.useState('');
    const [roverPhoto, setRoverPhoto] = useState([
      {img_src:"",rover:{name:"",landing_date:"",launch_date:""},camera:{full_name:""}}
    ]);
    const [roverPhotoParsed,setRoverPhotoParsed]= useState([
      {img_src:"",rover:{name:"",landing_date:"",launch_date:""},camera:{full_name:""}}
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem,setModalItem]=useState([]);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [drpValue,setDrpValue]=useState("curiosity");
    const [isFocus, setIsFocus] = useState(false);
    const [isLatest, setIsLatest] = useState(true);
    const [dateType, setDateType] = useState('earth');
    const [marsDate, setMarsDate] = useState("1000");
    const [earthDate, setEarthDate] = useState(new Date());
    const [showDate,setShowDate] = useState(false);
    const [displayDate,setDisplayDate] = useState("Enter Date");
    const [keyboardDisplay,setKeyboardDisplay]=useState(false);
    const [loader,setLoader]=useState(false);
    const [offset,setOffset]=useState(0);

    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardDisplay(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardDisplay(false);
    });

    const getDefaultRoverPhoto = () => {
      setDrpValue("curiosity");
      let url = roverPhotoURl(true,"curiosity");
        axios
          .get(url,{ headers: {
            Accept: "application/json",
            //"User-Agent": "axios 0.19.2"
            //"User-Agent": "axios 0.21.1"
          }})
          .then((response) => {
            setRoverPhotoParsed(response.data.latest_photos);
            setRoverPhoto(response.data.latest_photos);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const getRoverPhoto = (url:string) => {
          axios
            .get(url,{ headers: {
              Accept: "application/json",
              //"User-Agent": "axios 0.19.2"
              //"User-Agent": "axios 0.21.1"
            }})
            .then((response) => {

              if(isLatest){
                setRoverPhoto(response.data.latest_photos);
                setRoverPhotoParsed(response.data.latest_photos);
              }else{
                setRoverPhoto(response.data.photos);
                let parsedResponse = response.data.photos.slice(0,12);
                setRoverPhotoParsed(parsedResponse);
                setOffset(1);
                console.log("all data",response.data.photos);
                console.log("initial parsed",parsedResponse);

              }

              
              
            })
            .catch((err) => {
              console.log(err);
            });
            
            setLoader(false);
        };

    useEffect(()=>{
        getDefaultRoverPhoto();
    },[]);

    const selectPicture = (item:any) => {
      setModalItem(item);
      setModalVisible(true);
    };
    
      const renderItem = ({ item, index }) => {
        if (item.empty === true) {
          return <View style={[styles.galleryItem, styles.galleryItemInvisible]} />;
        }
        return (
          <View
            style={styles.galleryItem}
          >
            <TouchableOpacity onPress={()=>{selectPicture(item)}}>
              <Image source={{uri: item?.img_src?item.img_src:"https://i.stack.imgur.com/kOnzy.gif"}} style={{width: 120, height: 120}} />
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
        return error;
      };

      const search=()=>{
        setLoader(true);
        let date = dateType==="mars"?marsDate:
        earthDate.getFullYear()+'-'+((earthDate.getMonth() > 8) ? (earthDate.getMonth() + 1) : ('0' + (earthDate.getMonth() + 1)))+'-'+ ((earthDate.getDate() > 9) ? earthDate.getDate() : ('0' + earthDate.getDate()));
        let url = roverPhotoURl(isLatest,drpValue,dateType,date);
        console.log("URL: ",url);
        setTimeout(()=>{
          getRoverPhoto(url);
        },10)
      }

      const onChange = (event:any, selectedDate:any) => {
        const currentDate = selectedDate;
        setShowDate(false);
        setEarthDate(currentDate);
        let date = selectedDate.getFullYear()+'-'+((selectedDate.getMonth() > 8) ? (selectedDate.getMonth() + 1) : ('0' + (selectedDate.getMonth() + 1)))+'-'+ ((selectedDate.getDate() > 9) ? selectedDate.getDate() : ('0' + selectedDate.getDate()));
        setDisplayDate(date);
      };

      const loadMoreData=()=>{
          let firstIndex = (offset*13)-offset;
          let lastIndex = ((offset+1)*13)-(offset+1);

          if(offset>0){
            let parsedResponse = roverPhoto.slice(firstIndex,lastIndex);
            //console.log("slice",parsedResponse);
            parsedResponse = [...roverPhotoParsed,...parsedResponse];
            setRoverPhotoParsed(parsedResponse);
            setOffset(offset+1);
            console.log("appended slice",parsedResponse);
          }
      }

      const flatListLoad = (
        <View style={{flexDirection:"row",justifyContent:"center"}}>
          {roverPhoto.length===roverPhotoParsed.length?
          <></>:
          <>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
            <Text style={{paddingLeft:5}}>Loading more data...</Text>
          </>         
          }
        </View>
        
      );
     
    return(
    <View style={styles.container}>
        <View style={styles.body}>
          <View  style={isLatest?{flex:1}:{flex:3}}>
            <View style={{paddingBottom:10, flexDirection:"row",justifyContent:"space-between",flex:2}}>
              <View style={{flex:1,padding:20}}>
                <Dropdown
                  //selectedTextStyle={styles.selectedTextStyle}
                  //iconStyle={styles.iconStyle}
                  style={[styles.dropdown,isFocus && { borderColor: '#fc3d21' }]}
                  placeholderStyle={styles.drpPlaceholderStyle}
                  selectedTextStyle={styles.drpSelectedStyle}
                  iconColor={"black"}
                  itemTextStyle={[styles.drpPlaceholderStyle]}
                  containerStyle={[styles.dropDownContainerStyle]}
                  activeColor="#F5F5F5"
                  data={roverOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Curiosity"}
                  
                  value={drpValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setDrpValue(item.value);
                    setIsFocus(false);
                  }}
                />           
                <View style={{flexDirection:"row"}}>
                    <Checkbox
                      color="#0B3D91"
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
                      <RadioButton color="#0B3D91" value="earth" />
                      <Text style={{paddingTop:7,fontWeight:"bold",fontSize:14}}>Earth Date</Text>
                    </View>
                    <View style={{flexDirection:"row",bottom:5}}>
                      <RadioButton color="#0B3D91" value="mars" />
                      <Text style={{paddingTop:7,fontWeight:"bold",fontSize:14}}>Mars Date</Text>
                    </View>
                  </View>
                  :<></>
                }
                </RadioButton.Group>

              </View>
              <View style={{flex:1,padding:20}}>
              <Button 
                loading={loader}
                style={{width:"100%",borderRadius: 8,minHeight:45}}
                icon="magnify" 
                mode="outlined" 
                buttonColor='#0B3D91'
                textColor='white'
                onPress={search}>
                Search
              </Button>       
            
                {dateType==="mars"&&!isLatest?
              <View style={{paddingTop:40}}>              
                <TextInput
                  theme={MD3LightTheme}
                  mode="outlined"
                  outlineColor="#0B3D91"
                  outlineStyle={{borderWidth:2,borderRadius: 8}}
                  label="Mars Date - Sol"
                  value={marsDate}
                  onChangeText={sol => {

                    if(sol.length>1 && sol.charAt(0)==="0"){
                      sol = sol.substring(1, sol.length);
                    }
                    setMarsDate(sol);
                  }}
                /> 
                
                <HelperText type="error" visible={marsDateHasErrors()}>
                  Mars Date must be a number.
                </HelperText>
              </View>
              :<></>
              }

              {dateType==="earth"&&!isLatest?

              <View style={{paddingTop:50}}>
              <Button 
                style={{width:"100%",borderRadius: 8,minHeight:45}}
                icon="calendar-range" 
                mode="outlined" 
                buttonColor='#0B3D91'
                textColor='white'
                onPress={()=>{
                  setShowDate(true);
                }}>
                {displayDate}
              </Button>
              </View>
              :<></>
              }

              {showDate?
              <View>
              <DateTimePicker
                value={earthDate}
                mode={"date"}
                maximumDate={new Date()}
                onChange={onChange}
              />
              
              </View>
              :<></>
              }
              </View> 
            </View>
           

          </View>
          <View style={roverPhoto.length>0&&!keyboardDisplay?{flex:7}:{flex:3.5}}>
            {roverPhoto.length>0?
              <>
                <FlatList
                  data={roverPhotoParsed}
                  style={styles.galleryContainer}
                  renderItem={renderItem}
                  numColumns={3}
                  onEndReached={loadMoreData}
                  onEndReachedThreshold ={0.1}
                />
                
                {flatListLoad}
              </>
              
              :<View style={{padding:10,backgroundColor:"white"}}>
                <Text style={{padding:30, fontSize:20, textAlign:"center"}}>No Data Available</Text>
                <Image 
                style={{width: 100, height: 100, alignSelf:"center"}}
                source={hazard}></Image>
                
                <Text style={{padding:30, fontSize:20, textAlign:"center"}}>Detail Search parameters are available on the "Telemetrics" screen</Text>
              </View>
          
          }
          </View>
        </View>

        <View style={styles.footer}>
        <NavButtons navigation={navigation} value={"gallery"} setValue={setValue}></NavButtons>        
        </View>

        <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
        <View style={{flex:1,backgroundColor:"#F5F5F5", justifyContent:"center",alignItems:"flex-end"}}>
          <IconButton
            icon="close-circle-outline"
            iconColor="#0B3D91"
            size={30}
            onPress={hideModal}
          />
        </View>
          <Image source={{uri: modalItem.img_src?modalItem.img_src:"https://i.stack.imgur.com/kOnzy.gif"}} resizeMode="contain" style={styles.modalImageStyle}/>
          <Divider />
          <View style={{flex:3,backgroundColor:"#F5F5F5", flexDirection:"row"}}>
            <View style={{flex:1.5,}}>
              <Text style={styles.tableItemTitle}>Rover:</Text>
              <Text style={styles.tableItemTitleAlternate}>Status:</Text>
              <Text style={styles.tableItemTitle}>Landing Date:</Text>
              <Text style={styles.tableItemTitleAlternate}>Launch Date:</Text>
              <Text style={styles.tableItemTitle}>Camera:</Text>
            </View>
          
            <View style={{flex:1.5,}}>
              <Text style={styles.tableItemValue}>{modalItem?.rover?.name?modalItem.rover.name:""}</Text>
              <Text style={styles.tableItemValueAlternate}>{modalItem?.rover?.status?modalItem.rover.status:""}</Text>
              <Text style={styles.tableItemValue}>{modalItem?.rover?.landing_date?modalItem.rover.landing_date:""}</Text>
              <Text style={styles.tableItemValueAlternate}>{modalItem?.rover?.launch_date?modalItem.rover.launch_date:""}</Text>
              <Text style={styles.tableItemValue}>{modalItem?.camera?.full_name?modalItem.camera.full_name:""}</Text>
            </View>
          </View>

          <View style={{flex:2,alignItems:"center"}}>
            <Image style={{width: 100, height: 100}}
             source={rover}></Image>
          </View>
            
         
          <View style={{flex:1,backgroundColor:"#F5F5F5",justifyContent:"center"}}>
              <Button 
                style={{}}
                icon="close-circle-outline" 
                mode="outlined" 
                buttonColor='#0B3D91'
                textColor='white'
                onPress={hideModal}>
                {"Close"}
              </Button>
          </View>
        </Modal>
      </Portal>
    </View>
    );

  }

  export default RoverPhoto;
