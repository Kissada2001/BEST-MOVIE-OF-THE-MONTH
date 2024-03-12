import React from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Image, TextInput, ImageBackground } from 'react-native'
import Constants from 'expo-constants';
import AboutUsScreen from './about';
import { Button } from 'react-native-paper';

const Edit_profile = () => {
    const [showAbout, setShowAbout] = React.useState(false);

    function handleAboutPress() {
        setShowAbout(true);
    }

    if (showAbout) {
        return <AboutUsScreen />;
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/bg.jpg')} style={styles.backgroundImage}>
                <Image style={styles.logo} source={require("./assets/logo.png")} />

                <View style={styles.text_input}>
                    <Text style={{ fontSize: 30, marginTop: 20, marginBottom: 20 }}>Edit your profile</Text>
                    {/* <TextInput
                        style={{ marginVertical: 10, fontSize: 17, borderRadius: 15, backgroundColor: '#fff', padding: 20, width: 350, marginTop: 20 }}
                        placeholder="Tap to edit your profile"
                        autoCompleteType="tel"
                        keyboardType="name-phone-pad"
                        textContentType="familyName"
                    /> */}
                    <TextInput
                        style={{ marginVertical: 10, fontSize: 17, borderRadius: 15, backgroundColor: '#fff', padding: 20, width: 350, marginTop: 20 }}
                        placeholder="Enter your name"
                        autoCompleteType="name"
                        keyboardType="name-phone-pad"
                        textContentType="familyName"
                    />
                    <TextInput
                        style={{ marginVertical: 10, fontSize: 17, borderRadius: 15, backgroundColor: '#fff', padding: 20, width: 350, marginTop: 20 }}
                        placeholder="Enter your email"
                        autoCompleteType="email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                    />
                    <Button title="About Us" icon="information" style={{ width: 100, height: 100 }} onPress={handleAboutPress} />
                    <Button
                        title="Save"
                    />
                </View>
            </ImageBackground>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        paddingTop: Constants.statusBarHeight,
    },
    text_input: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 480,

    },
    logo: {
        marginTop: 25,
        width: 75,
        height: 75,
        marginLeft: 20,
    }
})

export default Edit_profile;