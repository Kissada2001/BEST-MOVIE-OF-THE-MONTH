import React from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button, Image } from 'react-native'
import LoginGoogleScreen from './Login-google';
import LoginScreen from './Login';


function HomeScreen({setIntro}) {
    const test = () => {
        let name = 'Home';
        setIntro(name);
    };
    const [showLogin, setShowLogin] = React.useState(false);
    const [showGoogleAut, setShowGoogleAut] = React.useState(false);

    function handleLoginPress(){
        setShowLogin(true);
    }

    function handleAboutPress() {
        setShowGoogleAut(true);
    }

    if (showGoogleAut) {
        return <LoginGoogleScreen />;
    }
    if (showLogin){
        return <LoginScreen />;
    }
    

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 100, padding: 100, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require("./assets/logo.png")}
                    style={{ width: 200, height: 200 }}
                />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 25, marginTop: 15, fontWeight: 800 }}>BEST MOVIE OF THE MONTH</Text>
            <Image
                source={require("./assets/img_home.png")}
                style={{ width: 340, height: 200 }}
                containerStyle={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 30 }}
            />
            <View style={{ padding: 10, alignItems: 'center' }}></View>
            <View style={{ width: 330, height: 300 }}>
                <Button
                    style={{ width: 100, height: 100, }}
                    title="Login with phone"
                    onPress={test}
                />
                <View style={{ padding: 10 }} />
                <Button
                    style={{ width: 100, height: 100 }}
                    title="Login with Google"
                    onPress={handleAboutPress}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default HomeScreen;