import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

// This is taken from "https://reactnative.dev/docs/network" to see if we can get something going! I'm trying to reformat it to understand it >:)
type Event= {
  id: number;
  name: string;
};

type EventResponse = {
  events: Event[];
};

const App = () => {
  const [isLoading, setLoading] = useState(true); //From example. My guess is that it starts the loading icon when you render the site and stops when it's sucessfully loaded the data.
  const [data, setData] = useState<Event[]>([]);

  const getEvents = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/post');//So in theory we can use the backend api here?
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
              {item.name}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;