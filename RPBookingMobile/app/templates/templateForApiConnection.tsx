import {View, Text, Button, StyleSheet} from 'react-native';

//This is a very stripped down way to see if we have connection to our backend. The only thing displayed is in the log files in the terminal.
//Output in the terminal on success will look something like:
/*
 Sending request...
 LOG  Response status: 200
 LOG  Response body: (the body of the response)
*/
export default function BackendConnectTest(){
const testBackend = async () => {
  try {
    console.log('Sending request...');

    const response = await fetch('http://10.0.2.2:5224/api/test', { //<-- Here we insert the http! When using android we also need the additional '10.0.2.2:' instead of 'localhost', also android has problems with connecting to https, so for now, before deployment, just use http (and run the http in VS, not the https)
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
  button: {
    color: "#2e9696"
  }
})
