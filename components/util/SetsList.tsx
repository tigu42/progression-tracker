import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TrainingSet } from '@/constants/Exercise'
import CustomButton from './CustomButton'

interface SetsListProps {
    sets: TrainingSet[],
    onChange: (sets: TrainingSet[]) => void
}

const SetsList = ({sets, onChange} : SetsListProps) => {

  if (sets.length === 0) {
    return (
        <View>
            <Text>Noch keine Sätze hinzugefügt</Text>
        </View>
    )
  }

  const handleSetChange = (set: TrainingSet, index: number): void => {
    let newSets : TrainingSet[] = [];
    for (let i = 0; i < sets.length; i++) {
        if (i === index) {
            newSets.push(set)
        }
            
        else {
            newSets.push(sets[i])
        }
    }
    onChange(newSets);
  }

  return (
    <View>
        <Text>Sätze</Text>
        <ScrollView>
            {sets.map((set, index) => (
                <TrainingSetInput key={index} set={set} index={index} onChange={handleSetChange}></TrainingSetInput>
            ))}
        </ScrollView>
    </View>
  )
}

const TrainingSetInput = ({set, index, onChange}: {set: TrainingSet, index: number,onChange: (set: TrainingSet, index: number) => void}) => {

    const [reps, setReps] = useState(set.reps);
    const [weight, setWeight] = useState(set.weight);

    const onRepsChange = (reps: string) => {
        let repsCount = Number(reps);
        setReps(repsCount);
        onChange({reps: repsCount, weight: weight}, index)
    }
    const onWeightChange = (weight: string) => {
        let weightCount = Number(weight);
        setWeight(weightCount);
        onChange({reps: reps, weight: weightCount}, index)
    }

    return(
    <View>
        <View style={styles.setsInputView}>
            <TextInput editable value={reps.toString()} style={styles.leftInput} onChangeText={onRepsChange}></TextInput>
            <Text style={styles.label}>Reps</Text>
            <View style={styles.horizontalSpacing}></View>
            <TextInput editable value={weight.toString()} onChangeText={onWeightChange} style={styles.rightInput}></TextInput>
            <Text style={styles.label}>kg</Text>
            <CustomButton style={styles.removeButton} onPress={() => { console.log("entfernen")}}>Entfernen</CustomButton>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    setsInputView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    leftInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        width: 60,
        fontSize: 18
    },
    rightInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        width: 60,
        fontSize: 18
    },
    horizontalSpacing: {
        flex: 1
    },
    removeButton: {
        flex: 2,
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10
    },
    label: {
        fontSize: 18
    }
})

export default SetsList