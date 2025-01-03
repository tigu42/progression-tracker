import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import FloatingAddButton from '@/components/util/FloatingAddButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExerciseCard from '@/components/Exercises/ExerciseCard'
import { TestExercises } from '@/constants/TestExercises'
import { Exercise } from '@/constants/Exercise'
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { useExercise } from '@/persistency/ExerciseContext'
import ScrollableLayout from '@/components/util/ScrollableLayout'



const ExerciseScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {exercises} = useExercise();
  

  return (
    <>
      <ScrollableLayout title="Alle Übungen" bottomSpace={60}>
        <View style={styles.cardsView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {exercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
          </ScrollView>
        </View>
      </ScrollableLayout>
      <FloatingAddButton onPress={() => navigation.navigate("screens/editExerciseScreen", {})}>
        <View style={styles.buttonView}>
          <Text style={styles.buttonText}>Neue Übung</Text>
          <AntDesign name="plus" size={28} color="white" />
        </View>
      </FloatingAddButton>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  titleText: {
    fontSize: 26,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  customHeader: {
    backgroundColor: 'white',
    borderColor: 'none',
    borderBottomColor: 'rgba(150, 150, 150, 0.34)',
    borderBottomWidth: 1,
    marginBottom: 4
  },
  cardsView: {
    flex: 1, // Lässt die ScrollView den verbleibenden Platz einnehmen
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
    marginRight: 10,
  }
});

export default ExerciseScreen;