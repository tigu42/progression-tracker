import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons'
const TabsLayout = () => {
  return (
    <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: Colors.primary}}>
        <Tabs.Screen name="activityScreen" options={{tabBarLabel: "Activities", tabBarIcon: ({color}) => (
          <Feather name="clock" size={24} color="black" />
        )}}/>
        <Tabs.Screen name="exerciseScreen" options={{tabBarLabel: "Exercises", tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="dumbbell" size={24} color="black" />
        )}}/>
    </Tabs>
  )
}

export default TabsLayout