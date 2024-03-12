import React from 'react';
import { View, Text, Button } from 'react-native';

function TestScreen({ setIntro }) {
    const test = () => {
        let name = 'Test';
        setIntro(name);
      };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <Text style={{ color: 'black', padding: 10 }}>Hello, world!</Text>
            <Button title="Click me" onPress={test} />
        </View>
        
    );
}

export default TestScreen;