import React from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Image, ImageBackground } from 'react-native';
import App from './App';
import 'expo-dev-client';
import { Button } from 'react-native-paper';

const AboutUsScreen = () => {
  const [showApp, setShowApp] = React.useState(false);

  function handleAboutPress() {
    setShowApp(true);
  }

  if (showApp) {
    return <App />;
  }


  return (
    <ImageBackground source={require('./assets/bg.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>About Us</Text>
          
        </View>
        <ScrollView style={styles.body}>
          <View><Button icon="arrow-left" onPress={handleAboutPress} /></View>
          <View style={styles.section}>
            <View style={styles.sectionContent}>
              <Image source={require('./assets/benz.png')} style={styles.sectionHeaderImage} />
              <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionHeader}>Developer 1</Text>
                <Text style={styles.sectionText}>Name: Krisada Thumporn</Text>
                <Text style={styles.sectionText}>Email: xxx@kkumail.com</Text>
                <Text style={styles.sectionText}>Phone: +66 xxx-xxx-xxxx</Text>
                
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionContent}>
              <Image source={require('./assets/pheem.png')} style={styles.sectionHeaderImage} />
              <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionHeader}>Developer 2</Text>
                <Text style={styles.sectionText}>Name: Phumtawan Lunabut</Text>
                <Text style={styles.sectionText}>Email: xxx@kkumail.com</Text>
                <Text style={styles.sectionText}>Phone: +66 xxx-xxx-xxxx</Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionContent}>
              <Image source={require('./assets/por.png')} style={styles.sectionHeaderImage} />
              <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionHeader}>Developer 3</Text>
                <Text style={styles.sectionText}>Name: Kunathip Padthaisong</Text>
                <Text style={styles.sectionText}>Email: xxx@kkumail.com</Text>
                <Text style={styles.sectionText}>Phone: +66 xxx-xxx-xxxx</Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionContent}>
              <Image source={require('./assets/moth.png')} style={styles.sectionHeaderImage} />
              <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionHeader}>Developer 4</Text>
                <Text style={styles.sectionText}>Name: Piyawat Phimsri</Text>
                <Text style={styles.sectionText}>Email: piyawat.phi@kkumail.com</Text>
                <Text style={styles.sectionText}>Phone: +66 xxx-xxx-xxxx</Text>
              </View>
            </View>
          </View>
          
        </ScrollView>
      </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    textShadowColor: '#000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  section: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#141414',
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  sectionHeaderImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  sectionTextContainer: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 10,
  },
  sectionText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
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
  body: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default AboutUsScreen;
