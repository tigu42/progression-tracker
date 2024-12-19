import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Activity } from '@/constants/Activity';
import { Dropdown } from 'react-native-element-dropdown';
import CustomDropdown from '@/components/util/CustomDropdown';
import { TestExercises } from '@/constants/TestExercises';
import { Exercise, PerformanceType, TrainingSet } from '@/constants/Exercise';
import { useState } from 'react';
import SetsList from '@/components/util/SetsList';
import CustomButton from '@/components/util/CustomButton';
import { calculatePr } from '@/util/prCalculator';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const createDropDownData = (exercises: Exercise[]) : {label: string, value: string}[] => {
  return exercises.map((exercise: Exercise) => ({label: exercise.name, value: exercise.name}))
}

const onSetsChange = (sets: TrainingSet[] , performanceType: PerformanceType ,setsArrayCallback: (s: TrainingSet[]) => void, prCallback: (p: number) => void) => {
  setsArrayCallback(sets);
  prCallback(calculatePr(sets, performanceType))
}

const performanceTypeFromName = (exerciseName: string, exercises: Exercise[]): PerformanceType => {
  for (let exercise of exercises) {
    if (exercise.name === exerciseName) return exercise.performanceType;
  }
  return PerformanceType.PR;
}

const EditActivityScreen = ({route}: any) => {
  const activity: Activity | null = route?.params?.activity || null;
  const dropDownData = createDropDownData(TestExercises);

  const trainingId : string = activity !== null ? activity.training.id : uuidv4();
  const [exerciseName, setExerciseName] = useState(activity !== null ? activity.exerciseName : TestExercises[0].name);
  const [setsArray, setSetsArray] = useState(activity !== null ? activity.training.sets : [])
  const [pr, setPr] = useState(activity !== null ? calculatePr(activity.training.sets, activity.performanceType) : 0)
  const performanceType: PerformanceType = performanceTypeFromName(exerciseName, TestExercises);
  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView style={styles.outerView} showsVerticalScrollIndicator={false}>
        <Text style={styles.chooseText}>Übung wählen {exerciseName}</Text>
        <CustomDropdown data={dropDownData} onSelect={(name: string) => {setExerciseName(name); onSetsChange(setsArray, performanceTypeFromName(name, TestExercises), setSetsArray, setPr)}} initialData={exerciseName}></CustomDropdown>
         {setsArray.map((set, index) => (
                <Text key={index}>{set.reps} x {set.weight}kg</Text>
        ))} 
        <Text style={styles.chooseText}>Sätze</Text>
        <SetsList sets={setsArray} onChange={(sets: TrainingSet[]) => {onSetsChange(sets, performanceType, setSetsArray, setPr)}}></SetsList>
        

      </ScrollView>
      <View style={styles.footerView}>
        <Text style={styles.prText}>{pr}{performanceType === PerformanceType.PR ? ' Reps PR' : 'kg 1RM'}</Text>
        <View style={styles.buttonView}>
          <CustomButton 
            onPress={() => { 
              const newSet = { reps: 0, weight: 0 };
              setSetsArray([...setsArray, newSet]);
            }}
            style={styles.addSetButton}
          >
            <Text>
              <Entypo name="plus" size={24} color="white" />
            </Text>
            
          </CustomButton>
          <CustomButton 
            onPress={() => { 
              const newSet = { reps: 0, weight: 0 };
              setSetsArray([...setsArray, newSet]);
            }}
            style={styles.saveButton}
          >
            <Text>
              <Feather name="check" size={24} color="white" />
            </Text>
            
          </CustomButton>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  outerView: {
    marginHorizontal: 15,
    flex: 1
  },
  chooseText: {
    fontSize: 28,
    marginBottom: 15,
    marginTop: 20,
  },
  addSetButton: {
    borderRadius: 10,
    //marginVertical: 10,
    marginRight: 10
  },
  safeView: {
    flex: 1
  },
  footerView: {
    marginHorizontal: 15,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: 'rgba(144, 218, 255, 0.65)',
    borderRadius: 10,

    },
    prText: {
      fontSize: 25,
      fontWeight: 600,
      marginLeft: 10
    },
    saveButton: {
      borderRadius: 10,
      marginRight: 15,
    },
    buttonView: {
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 10
    }
})

export default EditActivityScreen