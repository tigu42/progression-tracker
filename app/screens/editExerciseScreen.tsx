import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Exercise, PerformanceType } from '@/constants/Exercise';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '@/components/util/CustomInput';
import Spacing from '@/components/util/Spacing';
import CustomCheckbox from '@/components/util/CustomCheckbox';
import CustomButton from '@/components/util/CustomButton';
import { Feather } from '@expo/vector-icons';
import { useExercise } from '@/persistency/ExerciseContext';
import { useNavigation } from "@react-navigation/native";

const EditExerciseScreen = ({route} : any) => {
  const exercise: Exercise | null = route?.params?.exercise || null;
  const adding: boolean = exercise === null ? true: false;
  const [name, setName] = useState(exercise !== null ? exercise.name : '');   
  const [needsWeight, setNeedsWeight] = useState(exercise !== null ? exercise.performanceType === PerformanceType.RM ? true : false : false);
  const {exercises, addExercise, deleteExercise, editExercise} = useExercise();
  const navigation = useNavigation();

  const onCheckButtonPress = () => {
    if (adding) {
      addExercise({name: name, trainings: [], performanceType: needsWeight ? PerformanceType.RM : PerformanceType.PR})
    }
    else {
      if (exercise === null) return; // kann unmöglich da rein
      editExercise(exercise.name, {name: name, trainings: exercise.trainings, performanceType: needsWeight ? PerformanceType.RM : PerformanceType.PR})
    }
    navigation.goBack()
  }

  const onDeleteButtonPress = () => {
    if (exercise !== null) deleteExercise(exercise.name);
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.outerView}>

        <View>
          <Text style={styles.nameText}>Name der Übung</Text>
          <CustomInput initialValue={name} onChange={(text: string) => {setName(text)}}/>
          <Spacing marginTop={30}></Spacing>
          <View style={styles.checkboxView}>
          <Text style={styles.nameText}>Benötigt die Übung Gewichte?</Text>
          <CustomCheckbox initialValue={needsWeight} onChange={setNeedsWeight}></CustomCheckbox>
        </View>

        </View>
          <View style={styles.bottomBar}>
          <CustomButton onPress={onDeleteButtonPress }>
            <Feather name="trash" size={24} color="white" />
          </CustomButton>
          <CustomButton onPress={onCheckButtonPress}>
            <Feather name="check" size={24} color="white" />
          </CustomButton>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: 'white',
  },
  outerView: {
    marginHorizontal: 10,
    paddingTop: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 5
    
  },
  checkboxView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle'
  },
  bottomBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(144, 218, 255, 0.65)',
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    justifyContent: 'space-between'
  }
})

export default EditExerciseScreen