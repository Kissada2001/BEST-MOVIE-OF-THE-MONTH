import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import 'expo-dev-client';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import Header from "./Header";
import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import HomeScreen from "./Home";

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
    return (
        <PaperProvider>
            <ScrollView>
                <View style={styles.container}>
                    <Card>
                        <Image style={{ width: '100%', height: 200 }} source={{ uri: `${props.item.code}` }} />
                        <Card.Title title="The Movie Detail" />
                        <Card.Content>
                            <Text>{props.item.detail}</Text>
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
            <Button onPress={() => props.setItem(null)}>
                Back
            </Button>
            <StatusBar backgroundColor="rgba(200,0,0,0.4)" style="light" barStyle="light-content" />
        </PaperProvider>

    );
};

function Loading() {
    return <View><Text>Loading</Text></View>
}


export default function LoginGoogleScreen() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [corona, setCorona] = React.useState([]);
    const [citem, setCitem] = React.useState(null);

    React.useEffect(() => {
        var auth = getAuth();
        auth.onAuthStateChanged(function (us) {
            setUser(us);
        });
        dbListener("/corona", setCorona);
    }, []);


    GoogleSignin.configure({
        webClientId: '129113918929-8tojb3v3fvdhk9p5sikor78pn9mnof3u.apps.googleusercontent.com',
    });

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const user_sign_in = auth().signInWithCredential(googleCredential)
        user.user_sign_in.then((user) => {
            console.log(user);
        })
            .catch((error) => {
                console.log(error);
            })
        
        
    }
    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
        } catch (error) {
            console.error(error);
        }
    }
    const [showHome, setShowHome] = React.useState(false);

    function handleAboutPress() {
        setShowHome(true);
    }

    if (showHome) {
        return <HomeScreen />;
    }
    const signOutandShowHome = () => {
        signOut();
        handleAboutPress();
    }

    if (initializing) return null;

    if (!user) {

        return (
            <View style={styles.container}>
                <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                    <Image style={{ width: 200, height: 200 }} source={require("./assets/logo.png")} />
                    <GoogleSigninButton
                        style={{ width: 200, height: 50, margin: 80 }}
                        onPress={onGoogleButtonPress}
                    />
                    <Button icon="arrow-left" />
                    <Header />
                </ImageBackground>
            </View>
        )
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
                    <Card >
                        <ImageBackground source={backgroundImage}>
                            <View style={{ alignItems: 'center', marginTop: 50 }}>
                                <Image style={{ width: 200, height: 200, alignItems: 'center' }} source={require("./assets/logo.png")} />
                            </View>
                            <Card.Title title={`Welcome to The Movie, ${user.displayName}`}  />
                            <Card.Content style={{ margin: 10, marginLeft: 20, marginRight: 20 }}>
                                <FlatList data={corona}
                                    renderItem={({ item, index }) => renderCorona(item, index, setCitem)} >
                                </FlatList>
                            </Card.Content>
                            <Button icon="logout" onPress={signOutandShowHome}>
                                Sign Out
                            </Button>
                        </ImageBackground>
                    </Card>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="rgba(200,0,0,0.4)" style="light" barStyle="light-content" />
        </PaperProvider>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});