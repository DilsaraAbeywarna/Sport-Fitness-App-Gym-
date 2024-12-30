import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import imageMapping from '../utils/imageMapping';

const ExerciseDetails = () => {
  const { exercise } = useLocalSearchParams();

  // Ensure 'exercise' is a string
  const exerciseData = typeof exercise === 'string' ? JSON.parse(exercise) : null;

  if (!exerciseData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Invalid exercise data.</Text>
      </View>
    );
  }

  const exerciseImage =
    imageMapping[exerciseData.name] || require('../assets/images/HIIT.jpg');

  return (
    <ScrollView style={styles.container}>
      <Image source={exerciseImage} style={styles.exerciseImage} />
      <Text style={styles.exerciseName}>{exerciseData.name}</Text>
      <Text style={styles.exerciseType}>Type: {exerciseData.type}</Text>
      <Text style={styles.exerciseDifficulty}>Difficulty: {exerciseData.difficulty}</Text>
      <Text style={styles.exerciseInstructions}>{exerciseData.instructions}</Text>
    </ScrollView>
  );
};

export default ExerciseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop:100,
  },
  exerciseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  exerciseType: {
    fontSize: 16,
    color: '#BBF246',
    marginBottom: 10,
  },
  exerciseDifficulty: {
    fontSize: 16,
    color: '#FF5722',
    marginBottom: 20,
  },
  exerciseInstructions: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    fontSize: 18,
    color: '#FF5722',
  },
});
