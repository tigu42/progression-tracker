import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TrainingSet } from '@/constants/Exercise'
import CustomButton from './CustomButton'
import Feather from '@expo/vector-icons/Feather';

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
    console.log(index)
    for (let i = 0; i < sets.length; i++) {
        if (i === index) {
            if (set.weight !== -1) {
                newSets.push(set)
            }
        }
            
        else {
            newSets.push(sets[i])
        }
    }
    onChange(newSets);
  }

  return (
    <View>
        {sets.map((set, index) => (
            <TrainingSetInput key={index} set={set} index={index} onChange={handleSetChange}></TrainingSetInput>
        ))}
    </View>
  )
}

const TrainingSetInput = ({set, index, onChange}: {set: TrainingSet, index: number,onChange: (set: TrainingSet, index: number) => void}) => {

    let setsReps: number = set.reps;
    let setsWeight = set.weight;

    const onRepsChange = (reps: string) => {
        let repsCount = Number(reps);
        if (Number.isNaN(repsCount)) repsCount = 0;
        setsReps = repsCount;
        onChange({reps: repsCount, weight: setsWeight}, index)
    }
    const onWeightChange = (weight: string) => {
        let weightCount = Number(weight);
        if (Number.isNaN(weightCount)) weightCount = 0;
        setsWeight = weightCount;
        onChange({reps: setsReps, weight: weightCount}, index)
    }

    return(
    <View>
        <View style={styles.setsInputView}>
            <TextInput editable value={setsReps.toString()} style={styles.leftInput} onChangeText={onRepsChange}></TextInput>
            <Text style={styles.label}>Reps</Text>
            <View style={styles.horizontalSpacing}></View>
            <TextInput editable value={setsWeight.toString()} onChangeText={onWeightChange} style={styles.rightInput}></TextInput>
            <Text style={styles.label}>kg</Text>
            <CustomButton style={styles.removeButton} onPress={() => { onChange({reps: -1, weight: -1}, index)}}>
                <View>
                    <Feather name="x" size={24} color="white" />
                </View>
            </CustomButton>
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
        marginRight: 12,
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
        width: '12%',
        borderRadius: 10,
        marginLeft: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 0
    },
    label: {
        fontSize: 18
    },
    scrollView: {
    }
})

export default SetsList