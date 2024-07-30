import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './src/types';

import HomeScreen from "./src/screens/HomeScreen";
import NotesScreen from "./src/screens/NotesScreen";
import ViewNoteScreen from './src/screens/ViewNoteScreen'; 

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen 
            name="Notes" 
            component={NotesScreen} 
            options={({ route }) => ({
              headerTitle: route.params?.id ? 'Edit Note' : 'Create a New Note',
            })}
          />
        <Stack.Screen name="ViewNote" component={ViewNoteScreen} />
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
