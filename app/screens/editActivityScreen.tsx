import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Activity } from '@/constants/Activity';
import { Dropdown } from 'react-native-element-dropdown';
import CustomDropdown from '@/components/util/CustomDropdown';
import { TestExercises } from '@/constants/TestExercises';
import { Exercise } from '@/constants/Exercise';
import { useState } from 'react';
import SetsList from '@/components/util/SetsList';
import CustomButton from '@/components/util/CustomButton';
const createDropDownData = (exercises: Exercise[]) : {label: string, value: string}[] => {
  return TestExercises.map((exercise: Exercise) => ({label: exercise.name, value: exercise.name}))
}



const EditActivityScreen = ({route}: any) => {
  const activity: Activity | null = route?.params?.activity || null;
  const dropDownData = createDropDownData(TestExercises);
  const [exerciseName, setExerciseName] = useState(activity !== null ? activity.exerciseName : '');
  const [setsArray, setSetsArray] = useState(activity !== null ? activity.training.sets : [])
  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView style={styles.outerView} showsVerticalScrollIndicator={false}>
        <Text style={styles.chooseText}>Übung wählen {exerciseName}</Text>
        <CustomDropdown data={dropDownData} onSelect={(name: string) => {setExerciseName(name)}} initialData={exerciseName}></CustomDropdown>
        {/* {setsArray.map((set, index) => (
                <Text key={index}>{set.reps} x {set.weight}kg</Text>
        ))} */}
        <Text style={styles.chooseText}>Sätze</Text>
        <SetsList sets={setsArray} onChange={setSetsArray}></SetsList>
        <CustomButton 
          onPress={() => { 
            const newSet = { reps: 0, weight: 0 };
            setSetsArray([...setsArray, newSet]);
          }}
          style={styles.addSetButton}
        >
          <Text>
            Satz Hinzufügen
          </Text>
        </CustomButton>
        

      </ScrollView>
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
    marginVertical: 10
  },
  safeView: {
    flex: 1
  }
})

export default EditActivityScreen