import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { Exercise, PerformanceType } from '@/constants/Exercise'
import { safelyDecodeURIComponent } from 'expo-router/build/fork/getStateFromPath-forks'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Spacing from '../util/Spacing';

const getPR = (exercise: Exercise): number => {
  return exercise.trainings.reduce((highest, training) => 
    Math.max(highest, training.maxPerfomance), 0
  );
};

interface ExerciseCardProps {
    exercise: Exercise
}

const ExerciseCard = ({exercise}: ExerciseCardProps) => {


  return (
    <View style={styles.outerView}>
      <View style={styles.leftView}>
        <Text style={styles.nameText}>{exercise.name}</Text>
        <Button title='Trainieren'></Button>
      </View>
      <View style={styles.rightView}>
        <View>
          <Text style={styles.prText}>{getPR(exercise)}{exercise.performanceType === PerformanceType.RM ? 'kg 1RM' : 'PR'}</Text>
          <Text style={styles.trainedText}>{exercise.trainings.length} mal trainiert</Text>
        </View>
        <Spacing marginTop={29}></Spacing>
        <View style={styles.iconsView}>
          <MaterialIcons name="timeline" size={24} color="black" />
          <MaterialCommunityIcons name="pencil-box-outline" size={24} color="black" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    outerView: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
        boxShadow:" rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        backgroundColor: 'rgb(144, 218, 255)',
    },
    leftView: {
        flex: 1,
        justifyContent: 'space-between'
    },
    rightView: {
        flex: 1,
        alignItems: 'flex-end', 
        justifyContent: 'space-between',
        textAlign: 'right'
    },
    iconsView: {
        flexDirection: 'row', // Icons nebeneinander anordnen
        gap: 10, // Abstand zwischen den Icons
    },
    prText: {
        textAlign: 'right'
    },
    trainedText: {
        textAlign: 'right'
    },
    nameText: {

    }
})

export default ExerciseCard