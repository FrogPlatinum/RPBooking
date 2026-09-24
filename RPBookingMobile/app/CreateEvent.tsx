import {View, Text, Button, StyleSheet, TextInput, Pressable} from 'react-native';
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
const [status, setStatus] = useState('');
const [type, setType] = useState('');
const [message, setMessage] = useState('');

//We're not using these yet, but we might need them at some point, so I'm keeping them here :)
const eventStatuses = [ 'Cancelled', 'Completed', 'Scheduled', 'Full', ]; 
const eventTypes = [ 'TabletopRP', 'LiveRP' ];

//Making the post request!
const createEvent = async () => {
  try {
    console.log('Sending request...');

    const response = await fetch('http://10.0.2.2:5000/api/events', { //<-- Here we insert the http! When using android we also need the additional '10.0.2.2:' instead of 'localhost', also android has problems with connecting to https, so for now, before deployment, just use http (and run the http in VS, not the https)
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
 
          title,
          description,
          date, // Format: 2026-10-20T18:00:00
          ageRes: Number (ageRes),
          price: Number (price),
          minParticipant: Number (minParticipant),
          maxParticipant: Number (maxParticipant),
          privateEvent: Boolean (privateEvent),
          status: Number (status), //We can change these later if we wanna make it into the enums rather than just a number, but the number works for now!
          type:  Number (type), //We can change these later if we wanna make it into the enums rather than just a number, but the number works for now!

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


// Frontend starts HERE! (close to html)
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
          keyboardType="numeric"   
        />
        <TextInput
          style={styles.input}
          placeholder='Pris'
          value={price}
          onChangeText={(text)=> setPrice(text)}
          keyboardType="numeric"  
        />
        <TextInput
          style={styles.input}
          placeholder='Min Deltagere'
          value={minParticipant}
          onChangeText={(text)=> setMinParticipant(text)} 
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder='Max Deltagere'
          value={maxParticipant}
          onChangeText={(text)=> setMaxParticipant(text)}  
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder='Privat Event (true/false)'
          value={privateEvent}
          onChangeText={(text)=> setPrivateEvent(text)}  
        />
        <TextInput
          style={styles.input}
          placeholder='Eventstatus (0-3)'
          value={status}
          onChangeText={(text)=> setStatus(text)}  
          keyboardType="numeric"
          />
          <View>
          <Pressable>
           {/* Nothing in here yet, but I think this is the way to go with our enums! */}

          </Pressable>
          </View>
          


        <TextInput
          style={styles.input}
          placeholder='Eventtype (0-1)'
          value={type}
          onChangeText={(text)=> setType(text)}  
          keyboardType="numeric"
        />
      

        

    <Button
     title="Opret Event" onPress={createEvent}
     />
  </View>
);

}

// Styling here :) (close to css)

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