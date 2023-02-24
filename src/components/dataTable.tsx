import * as React from 'react';
import { DataTable,List } from 'react-native-paper';
import { Text,FlatList,View,SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import {styles} from "../screens/commonStyles";

const numberOfItemsPerPageList = [2, 4, 6, 8, 10, 12];

const headers = [
    {
      id: 1,
      title: 'Cameras',
    },
    {
      id: 2,
      title: 'Earth Date',
    },
    {
      id: 3,
      title: 'Sol',
    },
    {
      id: 4,
      title: 'Total Photos',
    },
    
  ];


interface dataProp{
    cameras:Array<string>,
    earth_date:number,
    sol:number,
    total_photos:number,
}

interface tableProp{
    data: Array<dataProp>;
}

const dataTable: React.FC<tableProp> = ({data}) => {

    data.forEach((elem, i)=>{
        elem.key=i;
    })

      const listObj=(cam:[],key:number)=>{
        const drpData= new Array();
        type camProp={
            name: string;
            value: string;
            key:number;
          }
          
        cam.forEach((elem:string, i) => {      
            let obj={}as camProp;
            obj.name=elem;
            obj.value=elem;
            obj.key=i;
            drpData.push(obj);
        })

        return(<Dropdown
            placeholderStyle={key%2===0?{color:"#F5F5F5"}:{color:"black"}}
            selectedTextStyle={key%2===0?{color:"#F5F5F5"}:{color:"black"}}
            iconColor={key%2===0?"#F5F5F5":"black"}
            itemTextStyle={{fontSize:10,flex:1}}
            containerStyle={[styles.dropDownContainerStyle,{width:100}]}
            data={drpData}
            maxHeight={300}
            labelField={"name"}
            valueField="value"
            placeholder={"Name"}
            onChange={item => {
                let selected:string = item.name;
                item.name = selected.length>6?selected.substring(0, 4)+"...":selected;
            }}
          />)
      }



    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[1]
    );
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

    React.useEffect(() => {
    setPage(0);
    }, [numberOfItemsPerPage]);

    const tableheader = (header) => (
    <DataTable.Title style={{justifyContent:"space-around"}} key={header.id}><Text style={{color:"black", fontSize:14, fontWeight:"bold"}}>{header.title}</Text></DataTable.Title>
    );

    
    const tableRow = (item) => {
        
        return(
        <DataTable.Row style={item.key%2===0?{backgroundColor:"#0B3D91"}:{backgroundColor:"#EDEDED"}} key={item.sol}>
            <DataTable.Cell style={{justifyContent:"space-around"}}>{listObj(item.cameras,item.key)}</DataTable.Cell>
            <DataTable.Cell style={{justifyContent:"space-around"}}><Text style={item.key%2===0?{color:"#F5F5F5"}:{color:"black"}}>{item.earth_date}</Text></DataTable.Cell>
            <DataTable.Cell style={{justifyContent:"space-around"}}><Text style={item.key%2===0?{color:"#F5F5F5"}:{color:"black"}}>{item.sol}</Text></DataTable.Cell>
            <DataTable.Cell style={{justifyContent:"space-around"}}><Text style={item.key%2===0?{color:"#F5F5F5"}:{color:"black"}}>{item.total_photos}</Text></DataTable.Cell>
        </DataTable.Row>
        );}

    return (
        
            <DataTable>
            <DataTable.Header>
            {headers.map((header) => tableheader(header))}
            </DataTable.Header>

            {data
                .slice(
                page * numberOfItemsPerPage,
                page * numberOfItemsPerPage + numberOfItemsPerPage
                )
                .map((row) => tableRow(row)) }

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${data.length}`}
                showFastPaginationControls
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={numberOfItemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                selectPageDropdownLabel={'Rows per page'}
                
            />
            </DataTable>
       
    );
};

export default dataTable;