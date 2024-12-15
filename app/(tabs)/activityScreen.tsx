import { View, Text, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import ActivityCard from '@/components/Activities/ActivityCard'
import { TestExercises } from '@/constants/TestExercises'
import Spacing from '@/components/util/Spacing'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Exercise } from '@/constants/Exercise'
import { FlatList } from 'react-native'
import { Activity } from '@/constants/Activity'


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

const activityScreen = () => {
  const activities = mapExercisesToActivities(TestExercises)
  return (
    <SafeAreaView>
      
      <View style={styles.cardsView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {activities.map(activity => (
             <ActivityCard activity={activity}>

             </ActivityCard>
             ))}
         

        </ScrollView>

        


      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cardsView: {
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default activityScreen