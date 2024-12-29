import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlanScreen from '../screens/planScreen';
const Stack = createNativeStackNavigator();

const PlanStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="screens/planScreen" 
        component={PlanScreen} 
        options={{ headerShown: false}} 
      />
    </Stack.Navigator>
  )
}

export default PlanStackNavigator