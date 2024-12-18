import { View, Text, Button, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Exercise, PerformanceType } from '@/constants/Exercise'
import { safelyDecodeURIComponent } from 'expo-router/build/fork/getStateFromPath-forks'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Spacing from '../util/Spacing';
import CustomButton from '../util/CustomButton';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
const getPR = (exercise: Exercise): number => {
  return exercise.trainings.reduce((highest, training) => 
    Math.max(highest, training.maxPerfomance), 0
  );
};

interface ExerciseCardProps {
    exercise: Exercise
}

const ExerciseCard = ({exercise}: ExerciseCardProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();


  return (
    <View style={styles.outerView}>
      <View style={styles.leftView}>
        <Text style={styles.nameText}>{exercise.name}</Text>
        <View style={styles.trainButton}>
          <CustomButton style={styles.trainButton} onPress={() => {console.log("train")}}>
            <View style={styles.trainButtonView}>
              <Text style={styles.trainButtonText}>Trainieren</Text>
            </View>
          </CustomButton>

        </View>
      </View>
      <View style={styles.rightView}>
        <View>
          <Text style={styles.prText}>{getPR(exercise)}{exercise.performanceType === PerformanceType.RM ? 'kg 1RM' : 'PR'}</Text>
          <Text style={styles.trainedText}>{exercise.trainings.length} mal trainiert</Text>
        </View>
        <Spacing marginTop={20}></Spacing>
        <View style={styles.iconsView}>
          <MaterialIcons name="timeline" size={28} color="black" />
          <Pressable onPress={() => navigation.navigate("screens/editExerciseScreen", {exercise})}>
            <MaterialCommunityIcons name="pencil-box-outline" size={28} color="black" />
          </Pressable>
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
        gap: 20, // Abstand zwischen den Icons
    },
    prText: {
        textAlign: 'right',
        fontSize: 20,
        marginBottom: 3
    },
    trainedText: {
        textAlign: 'right',
        fontSize: 16,
        color: 'rgb(95, 95, 95)'
    },
    nameText: {
      fontWeight: '600',
      fontSize: 17
    },
    trainButton: {
      borderRadius: 8,
      display: 'flex',
      justifyContent: 'center',
      width: '80%',
    },
    trainButtonView: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    trainButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 15
    }
})

export default ExerciseCard