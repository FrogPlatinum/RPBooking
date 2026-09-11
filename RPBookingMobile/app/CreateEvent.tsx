import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import {useState} from 'react';

export default function createEvent(){
const [text, onChangeText] = useState('Tekst');
const [number, onChangeNumber] = useState('');
const [message, setMessage] = useState('');
type Event= {
  Title: string;
  Description: string;
  Date: Date;
  AgeRes: string;
  Price: number;
  MinParticipant: number;
  MaxParticipant: number;
  PrivateEvent: boolean;
  EventStatus: string; // For now, since I'm not sure if typescript has enums
  EventType: string; // For now, since I'm not sure if typescript has enums
};

// type EventResponse = {
//   events: Event[];
// };
//Making the post request!
const createEvent = async () => {
  try {
    console.log('Sending request...');

    const response = await fetch('http://10.0.2.2:5224/api/events', { //<-- Here we insert the http! When using android we also need the additional '10.0.2.2:' instead of 'localhost', also android has problems with connecting to https, so for now, before deployment, just use http (and run the http in VS, not the https)
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
      Title: '',
      Description: '',
      Date: Date,
      AgeRes: '',
      Price: '',
      MinParticipant: '',
      MaxParticipant: '',
      PrivateEvent: '',
      EventStatus: '', 
      EventType: '',
      }), 
    });

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response body:', data);
    setMessage(data.message);
  } catch (error) {
    console.error('Request failed:', error)
  }
};

return (
  <View style={styles.container}>
   <Text>Opret Event</Text>
    <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="0"
          keyboardType="numeric"
        />
    <Button
     title="Opret Event" onPress={createEvent}
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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})