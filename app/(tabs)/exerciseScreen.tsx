import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import FloatingAddButton from '@/components/util/FloatingAddButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExerciseCard from '@/components/Exercises/ExerciseCard'
import { TestExercises } from '@/constants/TestExercises'
import { Exercise } from '@/constants/Exercise'
import AntDesign from '@expo/vector-icons/AntDesign';



const exerciseScreen = () => {
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Alle Übungen</Text>

      <View style={styles.cardsView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {TestExercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </ScrollView>
      </View>
      <FloatingAddButton onPress={() => console.log("floating")}>
        <View style={styles.buttonView}>
          <Text style={styles.buttonText}>Neue Übung</Text>
          <AntDesign name="plus" size={28} color="white" />
        </View>
      </FloatingAddButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 26,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  cardsView: {
    flex: 1, // Lässt die ScrollView den verbleibenden Platz einnehmen
    paddingHorizontal: 20,
  },
  floatingButton: {
    position: 'absolute', // Fixiert den Button
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 20,
    elevation: 10, // Schatten für Android
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10
  }
});

export default exerciseScreen;