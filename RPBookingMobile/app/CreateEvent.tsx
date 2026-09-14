import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import {useState} from 'react';

export default function createEvent(){

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [date, setDate] = useState('');
const [ageRes, setAgeRes] = useState('');
const [price, setPrice] = useState('');
const [minParticipant, setMinParticipant] = useState('');
const [maxParticipant, setMaxParticipant] = useState('');
const [privateEvent, setPrivateEvent] = useState('');
const [eventStatus, setEventStatus] = useState('');
const [eventType, setEventType] = useState('');


const [message, setMessage] = useState('');
// type Event= {
//   Title: string;
//   Description: string;
//   Date: Date;
//   AgeRes: string;
//   Price: number;
//   MinParticipant: number;
//   MaxParticipant: number;
//   PrivateEvent: boolean;
//   EventStatus: string; // For now, since I'm not sure if typescript has enums
//   EventType: string; // For now, since I'm not sure if typescript has enums
// };

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
      title, 
      description,
      date,
      ageRes,
      price,
      minParticipant,
      maxParticipant,
      privateEvent,
      eventStatus,
      eventType,
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
          placeholder='Titel'
          value={title}
          onChangeText={(text)=> setTitle(text)}  
        />
        <TextInput
          style={styles.input}
          placeholder='Beskrivelse'
          value={description}
          onChangeText={(text)=> setDescription(text)}  
        />
        <TextInput
          style={styles.input}
          placeholder='Dato'
          value={date}
          onChangeText={(text)=> setDate(text)}  
        />
        <TextInput
          style={styles.input}
          placeholder='Aldersrestriktioner'
          value={ageRes}
          onChangeText={(text)=> setAgeRes(text)}  
        />
        <TextInput
          style={styles.input}
          placeholder='Pris'
          value={price}
          onChangeText={(text)=> setPrice(text)}  
        />
        <TextInput
          style={styles.input}
          placeholder='Min Deltagere'
          value={minParticipant}
          onChangeText={(text)=> setMinParticipant(text)}  
        />
        <TextInput
          style={styles.input}
          placeholder='Max Deltagere'
          value={maxParticipant}
          onChangeText={(text)=> setMaxParticipant(text)}  
        />
        <TextInput
          style={styles.input}
          placeholder='Privat Event (true/false)'
          value={privateEvent}
          onChangeText={(text)=> setPrivateEvent(text)}  
        />
        <TextInput
          style={styles.input}
          placeholder='Eventstatus'
          value={eventStatus}
          onChangeText={(text)=> setEventStatus(text)}  
        />

        <TextInput
          style={styles.input}
          placeholder='Eventtype'
          value={eventType}
          onChangeText={(text)=> setEventType(text)}  
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
    minWidth: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})