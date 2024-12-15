import { View, Text } from 'react-native'
import React from 'react'
import { ExerciseTraining, PerformanceType } from '@/constants/Exercise';
import { Activity } from '@/constants/Activity';

interface ActivityCardProps {
  activity: Activity
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <View>
      <Text>{activity.exerciseName}</Text>
      {/* Beispielhafte Anzeige der Trainingsdaten */}
      <Text>Time: {activity.training.time.toISOString()}</Text>
      <Text>Max Performance: {activity.training.maxPerfomance} {activity.performanceType.toString()}</Text>
      {activity.training.sets.map((set, index) => (
        <Text key={index}>
          Set {index + 1}: {set.reps} reps @ {set.weight} kg
        </Text>
      ))}
    </View>
  );
}

export default ActivityCard;