import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import LoginScreen from './Login';




const firebaseConfig = {
  apiKey: "AIzaSyABu1zSi6nhztUm5BxiQXpRg9eIMUF_URs",
  authDomain: "work8-e8321.firebaseapp.com",
  databaseURL: "https://work8-e8321-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "work8-e8321",
  storageBucket: "work8-e8321.appspot.com",
  messagingSenderId: "129113918929",
  appId: "1:129113918929:web:28b9e6382a56d9aa9224f0",
  measurementId: "G-WZ2GRG499J"
};


LogBox.ignoreAllLogs(true);

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) { }

function dbListener(path, setData) {
  const tb = ref(getDatabase(), path);
  onValue(tb, (snapshot) => {
    setData(snapshot.val());
  })
}

function renderCorona(item, index, setItem) {
  var icon = <Image style={{ width: 30, height: 20 }} source={{ uri: `https://covid19.who.int/countryFlags/${item.code}.png` }} />
  var desc = <View>
    <Text>{"ผู้ป่วยสะสม " + item.confirmed + " ราย"}</Text>
    <Text>{"เสียชีวิต " + item.death + " ราย"}</Text>
    <Text>{"เพิ่งเสียชีวิต " + item.lastdeath + " ราย"}</Text>
  </View>;
  return <List.Item onPress={() => setItem(item)} title={item.name} description={desc} left={(props => icon)}></List.Item>
}


function Detail(props) {

  return <View>
    <Text>{JSON.stringify(props.item)}</Text>
    <Button onPress={() => props.setItem(null)}>
      Back
    </Button>
  </View>
};


function Loading() {
  return <View><Text>Loading</Text></View>
}



export default function App() {
  const [corona, setCorona] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [citem, setCitem] = React.useState(null);


  React.useEffect(() => {
    var auth = getAuth();
    auth.onAuthStateChanged(function (us) {
      setUser(us);
    });
    dbListener("/corona", setCorona);
  }, []);


  if (user == null) {
    return <LoginScreen/>;
  }


  if (corona.length == 0) {
    return <Loading />;
  }


  if(citem!=null){
    return <Detail item={citem} setItem={setCitem} />;
  }
  return (
<PaperProvider>      
    <View style={styles.container}>    
     <ScrollView>
      <Card>      
      <Card.Cover source={require("./assets/corona.jpg")}/>    
      <Card.Title title="Coronavirus Situation"/>            
      <Card.Content>
      <Text>Your Phone Number: {user.phoneNumber}</Text>          
      <FlatList data={corona}
        renderItem={ ({item,index})=> renderCorona(item, index, setCitem) } >
      </FlatList>          
      </Card.Content>
             
      </Card>              
     </ScrollView>  
    </View>
    <Button icon="logout" mode="contained" onPress={() => getAuth().signOut()}>
      Sign Out
      </Button>
      <StatusBar backgroundColor="rgba(200,0,0,0.4)" style="light" barStyle="light-content"/>
    </PaperProvider>

  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
