import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { ExerciseProvider } from '@/persistency/ExerciseContext'
const RootLayout = () => {
    const router = useRouter();

  return (
    <>
        <StatusBar style='dark'>

        </StatusBar>
        <ExerciseProvider>
          <Stack initialRouteName='(tabs)'>
              <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
              <Stack.Screen name="index" options={{ headerShown: false}}/>
          </Stack>
        </ExerciseProvider>
    </>
  )
}

export default RootLayout