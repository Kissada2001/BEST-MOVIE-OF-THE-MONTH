import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image, ImageBackground } from 'react-native';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import LoginScreen from './Login';
import 'expo-dev-client';
import AboutUsScreen from './about';
import Edit_profile from './Edit';

const backgroundImage = require('./assets/bg.jpg');

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
  var icon = <Image style={{ width: 100, height: 150 }} source={{ uri: `${item.code}` }} />
  var desc =
    <View>
      <Text>{item.date}</Text>
    </View>;
  return <List.Item onPress={() => setItem(item)} title={item.name} description={desc} left={(props => icon)}></List.Item>
}

function Detail(props) {
 
  const [showEdit, setShowEdit] = React.useState(false);

  
  function handleAboutPress() {
    setShowEdit(true);
  }  

  
  if (showEdit) {
    return <Edit_profile />;
  }

  return (
    <View>
      <ScrollView>
        <ImageBackground source={backgroundImage}>
        <View style={styles.header}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button icon="arrow-left" onPress={() => props.setItem(null)} />
            <Button icon="information" onPress={handleAboutPress} />
          </View>
        </View>
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: 0, margin: 20 }}>
              <Image style={{ width: 450, height: 300 }} source={{ uri: `${props.item.code}` }} />
            </View>
            <View style={{ marginTop: 20, margin: 20 }}>
              <Card>
                <Card.Title title="The Movie Detail" />
                <Card.Content>
                  <Text>{props.item.detail}</Text>
                </Card.Content>
              </Card>
            </View>
        </View>
        </ImageBackground>
      </ScrollView>
    </View>


  );
};

function Loading() {
  return <View><Text>Loading</Text></View>
}



export default function App() {
  const [corona, setCorona] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [citem, setCitem] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [intro, setIntro] = React.useState('');

  React.useEffect(() => {
    var auth = getAuth();
    auth.onAuthStateChanged(function (us) {
      setUser(us);
    });
    dbListener("/corona", setCorona);
  }, []);

  if (user == null) {
    return <LoginScreen />
    
  }


  if (corona.length == 0) {
    return <Loading />;
  }


  if (citem != null) {
    return <Detail item={citem} setItem={setCitem} />;
  }
  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground source={backgroundImage}>
            <View style={{ alignItems: 'center', margin: 20, marginTop: 30 }}>
              <Image style={{ width: 200, height: 200, alignItems: 'center' }} source={require("./assets/logo.png")} />
            </View>
            <View style={{ marginTop: 20, margin: 20 }}>
              <Card>
              
                <Card.Content style={{ margin: 5, marginLeft: 5, marginRight: 20 }}>
                  <FlatList data={corona}
                    renderItem={({ item, index }) => renderCorona(item, index, setCitem)} >
                  </FlatList>
                </Card.Content>
                <Button icon="logout" onPress={() => getAuth().signOut()}>

                </Button>
              </Card>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="rgba(200,0,0,0.4)" style="light" barStyle="light-content" />
    </PaperProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 0,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});
