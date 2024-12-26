import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import * as Svg from 'react-native-svg';
import {
    LineChart,
  } from "react-native-chart-kit";

import { createChartConfig, transformDataForLineChart } from '@/util/lineChartData';
import { ExerciseTraining, PerformanceType } from '@/constants/Exercise';
const formattedDate: (d: string) => string = (date: string) => {
    const formatDate = new Intl.DateTimeFormat('de-DE', {
        weekday: 'long',    // Wochentag, z.B. "Montag"
        day: '2-digit',     // Tag als 2-stellige Zahl
        month: '2-digit',   // Monat als 2-stellige Zahl
        year: 'numeric',    // Jahr als 4-stellige Zahl
        hour: '2-digit',    // Stunde als 2-stellige Zahl
        minute: '2-digit',  // Minute als 2-stellige Zahl
        hour12: false       // 24-Stunden-Format
      }).format(new Date(date));
    return formatDate.toString();
}




const screenWidth = Dimensions.get("window").width;
const padding = 15;
const ProgressScreen = ({route} : any) => {
  const exercise = route.params.exercise;
  const trainings: ExerciseTraining[] = exercise.trainings;
  const data = transformDataForLineChart(trainings)
  return (
    <View style={styles.safeView}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <Text style={styles.progressText}>Dein Fortschritt</Text>
            <View style={styles.chartView}>
            {trainings.length > 1 ?
                <LineChart
                    style={styles.chartStyle}
                    data={data}
                    width={screenWidth - 2* padding}
                    height={300}
                    verticalLabelRotation={30}
                    chartConfig={createChartConfig()}
                    bezier
                    withInnerLines={false}
                    withOuterLines={false}
                    fromZero={false}            
                /> : <Text>Es müssen mindestens zwei Trainings vorhanden sein, um ein Diagramm erstellen zu können</Text>}
            </View>
            <Text style={styles.allTrainingsText}>Alle Trainings</Text>
            <View>
                {[...trainings].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).map((training: ExerciseTraining, index: number) => (
                    <View key={index} style={styles.trainingView}>
                        <Text>{formattedDate(training.time)}</Text>
                        <Text style={styles.trainingText}>{training.maxPerfomance}{exercise.performanceType === PerformanceType.PR ? ' Reps PR' : 'kg RM'}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    chartStyle: {
        borderRadius: 12,
        marginTop: 0
    },
    safeView: {
        padding: padding,
        paddingVertical: 15,
        flex: 1
    },
    progressText: {
        fontSize: 25,
        marginTop: 0,
        marginBottom: 10
    },
    chartView: {
        flex: 1,
        marginBottom: 15
    },
    scroll: {
        flex: 1
    },
    trainingView: {
        backgroundColor: 'rgb(144, 218, 255)',
        marginBottom: 10,
        padding: 5,
        borderRadius: 6
    },
    trainingText: {
        fontSize: 20

    },
    allTrainingsText: {
        fontSize: 20,
        marginBottom: 15
    }
})

export default ProgressScreen;