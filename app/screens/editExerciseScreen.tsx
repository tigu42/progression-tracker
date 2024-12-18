import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Exercise } from '@/constants/Exercise';

const EditExerciseScreen = ({route} : any) => {
  const exercise: Exercise | null = route?.params?.exercise || null;
  const [name, setName] = useState(exercise !== null ? exercise.name : '');   

  return (
    <View>
      <Text>{name}</Text>
    </View>
  )
}

export default EditExerciseScreen