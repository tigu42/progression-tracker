import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { ExerciseTraining, PerformanceType } from '@/constants/Exercise';
import { Activity } from '@/constants/Activity';
import Spacing from '../util/Spacing';

interface ActivityCardProps {
  activity: Activity
}

const formattedDate: (d: Date) => string = (date: Date) => {
    const formatDate = new Intl.DateTimeFormat('de-DE', {
        weekday: 'long',    // Wochentag, z.B. "Montag"
        day: '2-digit',     // Tag als 2-stellige Zahl
        month: '2-digit',   // Monat als 2-stellige Zahl
        year: 'numeric',    // Jahr als 4-stellige Zahl
        hour: '2-digit',    // Stunde als 2-stellige Zahl
        minute: '2-digit',  // Minute als 2-stellige Zahl
        hour12: false       // 24-Stunden-Format
      }).format(date);
    return formatDate.toString();
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    return (
      <Pressable 
        style={({ pressed }) => [
          styles.outerView,
          pressed && { opacity: 0.8 } // Feedback beim Drücken
        ]}
        onPress={() => {
          console.log(activity);
        }}
      >
        <View style={styles.layoutView}>
          <View style={styles.leftView}>
            <Text style={styles.nameText}>{activity.exerciseName}</Text>
            <Spacing marginTop={10} />
            {activity.training.sets.map((set, index) => (
              <Text key={index}>
                {set.reps} {activity.performanceType === PerformanceType.RM ? `x ${set.weight} kg` : "Reps"}
              </Text>
            ))}
          </View>
  
          <View style={styles.rightView}>
            <Text style={styles.dateText}>
              {formattedDate(activity.training.time)}
            </Text>
            <Spacing marginTop={10} />
            <Text style={styles.prText}>
              {activity.training.maxPerfomance} {activity.performanceType === PerformanceType.RM ? "kg" : "Reps"}{" "}
              {activity.performanceType.toString()}
            </Text>
          </View>
        </View>
      </Pressable>
    );
};

const styles = StyleSheet.create({
    outerView: {
        //backgroundColor: 'rgba(0,166,249,0.4)',
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
        boxShadow:" rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        backgroundColor: 'rgb(144, 218, 255)',
    },
    leftView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '50%'
    },
    rightView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '50%'
    },
    layoutView: {
        display: "flex",
        flexDirection: 'row'
    },
    prText: {
        textAlign: 'right',
        fontSize: 20,
    },
    dateText: {
        textAlign: 'right',
        fontSize: 12
    },
    nameText: {
        fontSize: 17,
        fontWeight: 'bold'
    }

})

export default ActivityCard;