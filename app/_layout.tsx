import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
const RootLayout = () => {
    const router = useRouter();

  return (
    <>
        <StatusBar style='dark'>

        </StatusBar>
        <Stack initialRouteName='(tabs)'>
            <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
            <Stack.Screen name="index" options={{ headerShown: false}}/>
        </Stack>
    </>
  )
}

export default RootLayout