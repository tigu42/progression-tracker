import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { act } from 'react'
import { ExerciseTraining, PerformanceType } from '@/constants/Exercise';
import { Activity } from '@/constants/Activity';
import Spacing from '../util/Spacing';
import { router, Router } from 'expo-router';
import { useNavigation, ParamListBase,  NavigationProp } from '@react-navigation/native';
interface ActivityCardProps {
  activity: Activity,
  editable: boolean
}

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

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, editable }) => {

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const handlePress = (activity: Activity) => {
    if (editable) {
      navigation.navigate("screens/editActivityScreen", {activity, add: false}); // Übergibt die Aktivität als Param
    }
  };

    return (
      <Pressable 
        style={({ pressed }) => [
          styles.outerView,
          pressed && { opacity: 0.8 } // Feedback beim Drücken
        ]}
        onPress={() => {
          handlePress(activity)
        }}
      >
        <View style={styles.layoutView}>
          <View style={styles.leftView}>
            <Text style={styles.nameText}>{activity.exerciseName}</Text>
            <Spacing marginTop={30} />
            {activity.training.sets.map((set, index) => (
              <Text style={styles.setsText} key={index}>
                {set.reps} {activity.performanceType === PerformanceType.RM ? `x ${set.weight} kg` : "Reps"}
              </Text>
            ))}
          </View>
  
          <View style={styles.rightView}>
            <Text style={styles.dateText}>
              {formattedDate(activity.training.time)}
            </Text>
            <Spacing marginTop={30} />
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
        //boxShadow:" rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        //backgroundColor: 'rgb(144, 248, 255)',
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
        fontSize: 22,
    },
    dateText: {
        textAlign: 'right',
        fontSize: 14,
        color: 'rgb(70, 70, 70)'
    },
    nameText: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    setsText: {
      color: 'rgb(70, 70, 70)',
      fontSize: 16
    }

})

export default ActivityCard;