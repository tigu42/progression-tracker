import { View, Text, SafeAreaView } from 'react-native'
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
    <SafeAreaView>
      <View>
        <Text>Übung wählen {exerciseName}</Text>
        <CustomDropdown data={dropDownData} onSelect={(name: string) => {setExerciseName(name)}} initialData={exerciseName}></CustomDropdown>
        {/* {setsArray.map((set, index) => (
                <Text key={index}>{set.reps} x {set.weight}kg</Text>
        ))} */}
        <SetsList sets={setsArray} onChange={setSetsArray}></SetsList>
        <CustomButton 
          onPress={() => { 
            const newSet = { reps: 0, weight: 0 };
            setSetsArray([...setsArray, newSet]);
          }}
        >
          <Text>
            Satz Hinzufügen
          </Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}

export default EditActivityScreen