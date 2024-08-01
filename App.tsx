import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './src/types';

import HomeScreen from "./src/screens/HomeScreen";
import NoteScreen from "./src/screens/NoteScreen";
import ViewNoteScreen from './src/screens/ViewNoteScreen'; 

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4a2c2a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }} />
          <Stack.Screen 
              name="Note" 
              component={NoteScreen} 
              options={({ route }) => ({
                headerTitle: route.params?.id ? 'Edit Note' : 'Create Note',
              })}
            />
          <Stack.Screen 
            name="ViewNote" 
            component={ViewNoteScreen} 
            options={() => ({
              headerTitle: 'View Note',
            })}
          />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

export default App;
