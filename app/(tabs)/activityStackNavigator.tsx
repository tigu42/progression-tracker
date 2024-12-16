import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityScreen from "../screens/activityScreen";
import EditActivityScreen from "../screens/editActivityScreen";
const Stack = createNativeStackNavigator();

const ActivityStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="screens/activityScreen" 
        component={ActivityScreen} 
        options={{ headerShown: false}} // Kein Header für die Aktivitätsliste
      />
      <Stack.Screen 
        name="screens/editActivityScreen" 
        component={EditActivityScreen} 
        options={{ title: 'Aktivität bearbeiten'}} // Titel der Bearbeitungsseite
      />
    </Stack.Navigator>
  );
};

export default ActivityStackNavigator;