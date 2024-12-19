import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import React from 'react'

interface CustomInputProps {
    onChange: (s: string) => void; // Die Funktion, die bei einem Tap aufgerufen wird
    viewStyle?: ViewStyle;
    inputStyle?: TextStyle; 
}

const CustomInput = ({ viewStyle, inputStyle, onChange }: CustomInputProps) => {
    return (
      <View style={[styles.outerView, viewStyle]}>
        <TextInput style={[styles.inputStyle, inputStyle]} onChangeText={onChange} />
      </View>
    );
  };

const styles = StyleSheet.create({
    outerView: {
        
    },
    inputStyle: {
        padding: 10,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 17
    },
})

export default CustomInput