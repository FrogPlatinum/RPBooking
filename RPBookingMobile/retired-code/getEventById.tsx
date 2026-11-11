import {View, Text, Button, StyleSheet, ActivityIndicator, TextInput} from 'react-native';
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
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState('');
 
  const testBackend = async () => {
  try {
    setLoading(true);
    console.log('Sending request...');

   

    const response = await fetch(`http://10.0.2.2:5000/api/events/${id}`, { //1/2  difference from BackendConnectTest 
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

   // setMessage(JSON.stringify(data)); <- also works, but then it's all in one line
    setMessage(JSON.stringify(data, null, 2)); //<- 2/2 difference from BackendConnectTest, this returns our data as a string and seperates it into lines.

    console.log('Response body:', data);
  } catch (error) {
    console.error('Request failed:', error)
    setMessage("Failed to connect to API :(");
    
  } finally {
    setLoading(false);
  }
};

return (
  <View style={styles.container}>
   <Text>Skriv Id for at se event:</Text>
   <TextInput
             style={styles.input}
             placeholder='Skriv Id her'
             value={id}
             onChangeText={(text)=>setId(text)}  
             keyboardType="numeric"
             /> 
        {/* ^ Here I used the same logic as from CreateEvent. */}
    <Button
     title="Hent Event" onPress={testBackend}
     />
     {isLoading ? (<ActivityIndicator/>) : ( 
     
     <Text style={styles.coolText}>{message}</Text>
    )}
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
    fontSize: 30,
    fontFamily:'ui-monospace',
    // outline: "true",
    // outlineColor: "red",
    // outlineWidth: 3,
    padding: 10,

  },
  input: {
    height: 40,
    minWidth: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
