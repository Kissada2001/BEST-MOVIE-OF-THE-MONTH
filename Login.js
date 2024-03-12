import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform, Image, useWindowDimensions, ScrollView, KeyboardAwareScrollView
} from 'react-native';
import Logo from "./assets/logo.png"
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import HomeScreen from './Home';
import LoginGoogleScreen from './Login-google';


export default function LoginScreen() {
  // Ref or state management hooks
  const app = getApp();
  const auth = getAuth();
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();

  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;
  const { height } = useWindowDimensions();
  const [intro, setIntro] = React.useState('');

  if (intro != 'Home' ) {
    return <HomeScreen setIntro={setIntro} />;
  }

  return (
    <ScrollView>
      <View style={{ padding: 20, marginTop: 50 }}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
        // attemptInvisibleVerification
        />
        <View style={{ padding: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={Logo}
            style={{ width: 200, height: 200 }}
          />
        </View>


        <View style={styles.container}>
          <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            placeholder="+66 | 999 999 9999"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          />
        </View>

        <Button
          title="Send Verification Code"
          disabled={!phoneNumber}
          onPress={async () => {
            // The FirebaseRecaptchaVerifierModal ref implements the
            // FirebaseAuthApplicationVerifier interface and can be
            // passed directly to `verifyPhoneNumber`.
            try {
              const phoneProvider = new PhoneAuthProvider(auth);
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
              showMessage({
                text: 'Verification code has been sent to your phone.',
              });
            } catch (err) {
              showMessage({ text: `Error: ${err.message}`, color: 'red' });
            }
          }}
        />
        <View style={styles.container}>
          <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            editable={!!verificationId}
            placeholder="Enter OTP authentication"
            onChangeText={setVerificationCode}
          />
        </View>
        <Button
          title="Confirm Verification Code"
          disabled={!verificationId}
          onPress={async () => {
            try {
              const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              await signInWithCredential(auth, credential);
              showMessage({ text: 'Phone authentication successful 👍' });
            } catch (err) {
              showMessage({ text: `Error: ${err.message}`, color: 'red' });
            }
          }}
        />
        {message ? (
          <TouchableOpacity
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 0xffffffee, justifyContent: 'center' },
            ]}
            onPress={() => showMessage(undefined)}>
            <Text
              style={{
                color: message.color || 'blue',
                fontSize: 17,
                textAlign: 'center',
                margin: 20,
              }}>
              {message.text}
            </Text>
          </TouchableOpacity>
        ) : (
          undefined
        )}
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 150,
  },
  logo: {
    alignItems: 'center',
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  text: {
    alignItems: 'left',
  },
  container: {
    backgroundColor: '#F5F5F5',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 20,
    marginVertical: 20,
  },

});