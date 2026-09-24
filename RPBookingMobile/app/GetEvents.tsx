import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

// This is taken from "https://reactnative.dev/docs/network"! I redid it to get events from our backend :)
type Event= {
  id: number;
  title: string;
  description: string;
  date: string;
  ageRes: number;
  price: number;
  minParticipant: number;
  maxParticipant: number;
  privateEvent: number;
  status: string;
  type: string;

};

type EventResponse = {
  events: Event[];
};

const App = () => {
  const [isLoading, setLoading] = useState(true); //From example. My guess is that it starts the loading icon when you render the site and stops when it's sucessfully loaded the data.
  const [data, setData] = useState<Event[]>([]);

  const getEvents = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/events', {method:'GET',}) //api! We can only use http for now :)
      const json = (await response.json()) as EventResponse;
      setData(json.events);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => (
            <Text>
              {item.title}, 
              {item.description}, 
              {item.date},
              {item.ageRes},
              {item.price},
              {item.minParticipant},
              {item.maxParticipant}
              {item.privateEvent},
              {item.status},
              {item.type}
              ☺ {/* ☺ <- seperator */}

            </Text>
            
          )}
        />
      )}
    </View>
  );
};

export default App;