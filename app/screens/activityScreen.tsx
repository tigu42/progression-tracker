import { View, Text, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import ActivityCard from '@/components/Activities/ActivityCard'
import Spacing from '@/components/util/Spacing'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Exercise } from '@/constants/Exercise'
import { FlatList } from 'react-native'
import { Activity } from '@/constants/Activity'
import FloatingAddButton from '@/components/util/FloatingAddButton'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router'
import { routeToScreen } from 'expo-router/build/useScreens'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { useExercise } from '@/persistency/ExerciseContext'

const mapExercisesToActivities = (exercises: Exercise[]): Activity[] => {
  // Transformiere die Exercises in Activities
  const activities = exercises.flatMap(exercise =>
    exercise.trainings.map(training => ({
      training: training,
      exerciseName: exercise.name,
      performanceType: exercise.performanceType,
    }))
  );

  // Sortiere die Aktivitäten nach Zeit (neueste zuerst)
  return activities.sort((a, b) => b.training.time.getTime() - a.training.time.getTime());
};

const ActivityScreen = () => {
  const {exercises} = useExercise();
  
  const activities = mapExercisesToActivities(exercises); // Deine Logik für Aktivitäten
    const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}>
        <Text style={styles.titleText}>Alle Trainings</Text>
      </View>

      <View style={styles.cardsView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {activities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
        </ScrollView>
      </View>
      <FloatingAddButton onPress={() => navigation.navigate("screens/editActivityScreen", {add: true})}>
        <AntDesign name="plus" size={28} color="white" />
      </FloatingAddButton>
    </SafeAreaView>
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
});

export default ActivityScreen;