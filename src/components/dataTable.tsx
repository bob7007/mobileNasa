import * as React from 'react';
import { DataTable,List } from 'react-native-paper';
import { Text,FlatList,View,SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

const numberOfItemsPerPageList = [1, 3, 5];

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

      const listObj=(cam:[])=>{
        const drpData= new Array();
        type camProp={
            name: string;
            value: string;
            key:number;
          }
          
        cam.forEach((elem, i) => {      
            let obj={}as camProp;
            obj.name=elem;
            obj.value=elem;
            obj.key=i;
            drpData.push(obj);
        })


        return(<Dropdown
            //selectedTextStyle={styles.selectedTextStyle}
            //iconStyle={styles.iconStyle}
            //style={[styles.dropdown,isFocus && { borderColor: '#fc3d21'}]}
            //placeholderStyle={styles.drpPlaceholderStyle}
            //selectedTextStyle={styles.drpSelectedStyle}
            iconColor={"black"}
            itemTextStyle={{fontSize:10}}
            //containerStyle={[styles.dropDownContainerStyle]}
            activeColor="#F5F5F5"
            data={drpData}
            maxHeight={300}
            labelField="name"
            valueField="value"
            placeholder={"Cam"}
            //value={"Sample 7"}
            //onFocus={() => setIsFocus(true)}
            //onBlur={() => setIsFocus(false)}
            onChange={item => {
                
            }}
          />)
      }



    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[2]
    );
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

    React.useEffect(() => {
    setPage(0);
    }, [numberOfItemsPerPage]);

    const tableheader = (header) => (
    <DataTable.Title key={header.id}><Text style={{color:"black", fontSize:14, fontWeight:"bold"}}>{header.title}</Text></DataTable.Title>
    );

    
    const tableRow = (item) => {
        
        return(
        <DataTable.Row style={item.key%2===0?{backgroundColor:"#a2a6e4"}:{backgroundColor:"#EDEDED"}} key={item.key}>
            <DataTable.Cell>{listObj(item.cameras)}</DataTable.Cell>
            <DataTable.Cell>{item.earth_date}</DataTable.Cell>
            <DataTable.Cell>{item.sol}</DataTable.Cell>
            <DataTable.Cell>{item.total_photos}</DataTable.Cell>
        </DataTable.Row>
        );}

    return (
        <PaperProvider>
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
        </PaperProvider>
    );
};

export default dataTable;