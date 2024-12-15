import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface SpacingProps {
    marginTop: number
}

const Spacing = ({marginTop}: SpacingProps) => {
  return (
    <View style={[styles.view, { marginTop }]} />

  )
}

const styles = StyleSheet.create({
    view: {
      height: 10, 
    },
  });

export default Spacing