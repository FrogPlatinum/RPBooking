//My guess is it should be a mix of the GetEventById and CreateEvent files.

import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function createEvent(){

const [id, setId] = useState('');
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

//Making the Patch request!
const createEvent = async () => {
  try {
    console.log('Sending request...');

    // --- NULL HANDLING HELPERS ---
    // Converts empty text elements to null values
    const parseText = (val: string) => val.trim() !== '' ? val.trim() : null;

    // Converts text to a number if filled; otherwise returns null
    const parseNumber = (val: string) => val.trim() !== '' ? Number(val) : null;

    // Converts text to boolean explicitly if matching string, otherwise returns null
    const parseBoolean = (val: string) => {
      if (val.toLowerCase().trim() === 'true') return true;
      if (val.toLowerCase().trim() === 'false') return false;
      return null;
    };

    // Construct the payload utilizing our helpers
    const payload = {
      title: parseText(title),
      description: parseText(description),
      date: parseText(date), // Format: 2026-10-20T18:00:00
      ageRes: parseNumber(ageRes),
      price: parseNumber(price),
      minParticipant: parseNumber(minParticipant),
      maxParticipant: parseNumber(maxParticipant),
      privateEvent: parseBoolean(privateEvent),
      status: parseNumber(status), 
      type: parseNumber(type), 
    };

    console.log('Payload being sent:', payload); // See the explicit null structures in your console!

    const response = await fetch(`http://10.0.2.2:5000/api/events/${id}`, { 
      method: 'Patch',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(payload), // the payload we made above
    });

    console.log('Response status:', response.status);

    if (response.status === 204) {
      setMessage('Event updated successfully');
    } else {
      const data = await response.json();
      console.log('Response body:', data);
      setMessage(data.message);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
};

// Frontend starts HERE! (close to html)
return (
  <View style={styles.container}>
   <Text>Rediger Event</Text>
   <TextInput
          style={styles.input}
          placeholder='Event ID'
          value={id}
          onChangeText={(text)=> setId(text)} 
          keyboardType="numeric"
        />
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