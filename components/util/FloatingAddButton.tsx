import { View, Text, Button, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const FloatingAddButton = ({children, onPress}: {children: any, onPress: () => void}) => {
  return (
    <View style={styles.outerView}>
        <TouchableOpacity>
            <Pressable onPress={onPress}>
                <View style={styles.innerView}>
                    {children}
                </View>
            </Pressable>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    outerView: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: '#00A6F9',
        borderRadius: 8,
        elevation: 10, // Fügt einen Schatten hinzu (nur für Android)
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerView: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FloatingAddButton