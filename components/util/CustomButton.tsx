import React from "react";
import { Text, Pressable, StyleSheet, ViewStyle } from "react-native";

interface CustomButtonProps {
  children: React.ReactNode; // Der Inhalt des Buttons
  onPress: () => void; // Die Funktion, die bei einem Tap aufgerufen wird
  style?: ViewStyle; // Optionale zusätzliche Stile
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onPress, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed, // Opacity-Effekt beim Drücken
        style, // Zusätzliche Stile
      ]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00A6F9", // Hellblau
    borderRadius: 20, // Abgerundete Ecken
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7, // Leichter Transparenzeffekt beim Tippen
  },
  text: {
    color: "#FFFFFF", // Weißer Text
    fontSize: 16,
  },
});

export default CustomButton;
