import { View, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

interface CustomCheckboxProps {
  onChange: (value: boolean) => void; // Callback-Funktion bei Statusänderung
  viewStyle?: ViewStyle; // Stil für die äußere View
  checkboxStyle?: ViewStyle; // Stil für den "Slider" (die Checkbox)
  initialValue?: boolean;
}

const CustomCheckbox = ({ viewStyle, checkboxStyle, onChange, initialValue }: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(initialValue !== null ? initialValue : false); // Lokaler State für Checkbox-Status

  const handlePress = () => {
    const newValue = !isChecked; // Umschalten des Wertes
    setIsChecked(newValue); // State aktualisieren
    onChange(newValue); // Callback-Funktion aufrufen
  };

  return (
    <View style={[styles.outerView, viewStyle]}>
      <TouchableOpacity
        style={[
          styles.slider,
          isChecked && styles.sliderChecked, // Stil für aktiven Zustand
          checkboxStyle,
        ]}
        onPress={handlePress}
      >
      {isChecked ? 
      <Feather name="check" size={24} color="white" /> :
      <Feather name="check" size={24} color="white" />  }

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerView: {

  },
  slider: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderChecked: {
    backgroundColor: 'green', // Farbe, wenn aktiviert
  },
});

export default CustomCheckbox;