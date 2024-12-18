import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExerciseScreen from '../screens/exerciseScreen';
import EditExerciseScreen from '../screens/editExerciseScreen';
const Stack = createNativeStackNavigator();

const ExerciseStackNavigator = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen 
            name="screens/exerciseScreen" 
            component={ExerciseScreen} 
            options={{ headerShown: false}} // Kein Header für die Aktivitätsliste
          />
          <Stack.Screen 
            name="screens/editExerciseScreen" 
            component={EditExerciseScreen} 
            options={{ title: 'Übung bearbeiten'}} // Titel der Bearbeitungsseite
          />
        </Stack.Navigator>
      );
}

export default ExerciseStackNavigator