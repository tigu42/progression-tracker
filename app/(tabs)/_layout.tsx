import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { MaterialCommunityIcons, Octicons, Feather } from '@expo/vector-icons'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: Colors.primary}}>
        <Tabs.Screen name="activityStackNavigator" options={{tabBarLabel: "Aktivitäten", tabBarIcon: ({color}) => (
          <Feather name="clock" size={24} color="black" />
        )}}/>
        <Tabs.Screen name="exerciseStackNavigator" options={{tabBarLabel: "Übungen", tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="dumbbell" size={24} color="black" />
        )}}/>
        <Tabs.Screen name="planStackNavigator" options={{tabBarLabel: "Pläne", tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="book-open-variant" size={24} color="black" />
        )}}/>
    </Tabs>
  )
}

export default TabsLayout