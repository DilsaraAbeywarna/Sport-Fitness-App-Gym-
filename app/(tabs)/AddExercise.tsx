import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import imageMapping from '../../utils/imageMapping'; // Adjust path as necessary

interface Exercise {
  name: string;
  type: string;
  imageUrl?: string;
  difficulty?: string;
  instructions?: string;
}

const AddExercise = () => {
  const { savedExercises }: { savedExercises: string } = useLocalSearchParams();
  const exercises: Exercise[] = JSON.parse(savedExercises); // Parse the saved exercises string back to an array
  const router = useRouter();

  const handleSaveExercise = (exercise: Exercise) => {
    // Logic for saving or unsaving the exercise
    // You can implement the functionality for adding or removing the exercise from savedExercises
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Exercises</Text>
      {exercises.length === 0 ? (
        <Text style={styles.emptyText}>No saved exercises.</Text>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const exerciseImage = imageMapping[item.name] || require('../../assets/images/HIIT.jpg');
            return (
              <TouchableOpacity style={styles.todayPlanCard}>
                <Image source={exerciseImage} style={styles.todayPlanImage} />
                <View style={styles.todayPlanDetails}>
                  <Text style={styles.todayPlanName}>{item.name}</Text>
                  <Text style={styles.todayPlanInfo}>{item.type}</Text>
                  <Text style={styles.statusTag}>{item.difficulty}</Text>
                  <Text style={styles.descriptionText} numberOfLines={2} ellipsizeMode="tail">
                    {item.instructions}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: '/ExerciseDetails',
                        params: { exercise: JSON.stringify(item) },
                      })
                    }
                    style={styles.seeMoreButton}
                  >
                    <Text style={styles.seeMoreText}>See More</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default AddExercise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop:80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BBF246',
    marginBottom: 20,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  todayPlanCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  todayPlanImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  todayPlanDetails: {
    marginLeft: 15,
    flex: 1,
  },
  todayPlanName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  todayPlanInfo: {
    fontSize: 14,
    color: '#888',
  },
  statusTag: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  saveButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  seeMoreButton: {
    marginTop: 10,
  },
  seeMoreText: {
    fontSize: 14,
    color: '#BBF246',
    textDecorationLine: 'underline',
  },
});
