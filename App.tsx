import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './src/types';

import HomeScreen from "./src/screens/HomeScreen";
import NotesScreen from "./src/screens/NotesScreen";
import AddNoteButton from "./src/components/AddNoteButton";

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerTitle: "All Notes",
          headerRight: () => <AddNoteButton/>
        }}/>
        <Stack.Screen name="Notes" component={NotesScreen} options={{
          headerTitle: "Create a New Note"
        }}/>
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
