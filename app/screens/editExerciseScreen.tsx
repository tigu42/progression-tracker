import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Exercise } from '@/constants/Exercise';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '@/components/util/CustomInput';
import Spacing from '@/components/util/Spacing';
import CustomCheckbox from '@/components/util/CustomCheckbox';
import CustomButton from '@/components/util/CustomButton';
import { Feather } from '@expo/vector-icons';
const EditExerciseScreen = ({route} : any) => {
  const exercise: Exercise | null = route?.params?.exercise || null;
  const [name, setName] = useState(exercise !== null ? exercise.name : '');   
  const [needsWeight, setNeedsWeight] = useState(false);
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.outerView}>

        <View>
          <Text style={styles.nameText}>Name der Übung</Text>
          <CustomInput initialValue={name} onChange={(text: string) => {setName(text)}}/>
          <Spacing marginTop={30}></Spacing>
          <View style={styles.checkboxView}>
          <Text style={styles.nameText}>Benötigt die Übung Gewichte?</Text>
          <CustomCheckbox onChange={setNeedsWeight}></CustomCheckbox>
        </View>

        </View>
          <View style={styles.bottomBar}>
          <CustomButton onPress={() => {console.log("x")}}>
            <Feather name="trash" size={24} color="white" />
          </CustomButton>
          <CustomButton onPress={() => {console.log("x")}}>
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