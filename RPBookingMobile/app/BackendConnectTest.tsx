import {View, Text, Button, StyleSheet} from 'react-native';
import {useState} from 'react';

//This is a very stripped down way to see if we have connection to our backend. The only thing displayed is in the log files in the terminal.
//Output in the terminal on success will look something like:
/*
 Sending request...
 LOG  Response status: 200
 LOG  Response body: (the body of the response)
*/
export default function BackendConnectTest(){
  const [message, setMessage] = useState('');

  const testBackend = async () => {
  try {
    console.log('Sending request...');

    const response = await fetch('http://10.0.2.2:5224/api/test', { //<-- Here we insert the http! When using android we also need the additional '10.0.2.2:' instead of 'localhost'
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json', <- for POST and such!
      },
      // body: JSON.stringify({
      //   firstParam: 'yourValue',
      //   secondParam: 'yourSecondValue',
      // }), <- for POST!
    });

    console.log('Response status:', response.status);

    const data = await response.json();

    setMessage(data.message);

    console.log('Response body:', data);
  } catch (error) {
    console.error('Request failed:', error)
  }
};

return (
  <View style={styles.container}>
   <Text>Backend Connection Test</Text>
    <Button
     title="Test Backend" onPress={testBackend}
     />
     <Text style={styles.coolText}>{message}</Text>
  </View>
);

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2e7b1",
  },
  coolText: {
    color: "#2e9696",
    fontSize: 50,
    fontFamily:'ui-monospace',
    outline: "true",
    outlineColor: "red",
  }
})
