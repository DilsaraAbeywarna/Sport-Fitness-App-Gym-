import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FAB } from 'react-native-paper'; // Floating action button
import { useRouter } from 'expo-router'; // Import router for navigation
import { useLocalSearchParams } from 'expo-router';
import imageMapping from '../../utils/imageMapping'; // Adjust path as necessary
import Icon from 'react-native-vector-icons/MaterialIcons'; // For heart icon

interface Exercise {
  name: string;
  type: string;
  imageUrl?: string;
  difficulty?: string;
  instructions?: string;
}

const HomeScreen = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [savedExercises, setSavedExercises] = useState<Exercise[]>([]); // Store saved exercises as objects
  const router = useRouter(); // Initialize router
  const { username } = useLocalSearchParams();

  useEffect(() => {
    getExercises();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredExercises(exercises);
    } else {
      const filtered = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  }, [searchQuery, exercises]);

  const getExercises = async () => {
    const URL = 'https://api.api-ninjas.com/v1/exercises?muscle=chest';
    const apiKey = 'UO+LlZPm4QqD9UEaq9ccBg==SGjEfw2WeaoV5pmp'; // Replace with environment variable for production

    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      });
      const data = await response.json();

      const updatedData = data.map((exercise: Exercise) => ({
        ...exercise,
        difficulty: exercise.difficulty || 'Medium',
        instructions: exercise.instructions || 'Follow proper form and technique for each exercise.',
      }));

      setExercises(updatedData);
      setFilteredExercises(updatedData);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const handleSaveExercise = (exercise: Exercise) => {
    // Check if the exercise is already saved
    if (savedExercises.some((saved) => saved.name === exercise.name)) {
      // Unsaved it
      setSavedExercises((prev) => prev.filter((saved) => saved.name !== exercise.name));
    } else {
      // Save it
      setSavedExercises((prev) => [...prev, exercise]);
    }
  };

  const renderTodayPlan = ({ item }: { item: Exercise }) => {
    const exerciseImage =
      imageMapping[item.name] || require('../../assets/images/HIIT.jpg');

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

          {/* Heart icon to save or unsave exercise */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => handleSaveExercise(item)}
          >
            <Icon
              name={savedExercises.some((saved) => saved.name === item.name) ? 'favorite' : 'favorite-border'}
              size={24}
              color={savedExercises.some((saved) => saved.name === item.name) ? '#FF5722' : '#888'}
            />
          </TouchableOpacity>

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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {username ? username : 'Guest'}!</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Exercises"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredExercises.length === 0 ? (
        <Text style={styles.emptyText}>No exercises found. Try a different search term.</Text>
      ) : (
        <>
          <Text style={styles.sectionHeader}>Today's Plan</Text>
          <FlatList
            data={filteredExercises.slice(0, 10)}
            renderItem={renderTodayPlan}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}

      {/* Floating Button for saved exercises */}
      <FAB
        style={styles.fab}
        icon={() => <Icon name="favorite" size={24} color="#fff" />}
        label={`Saved: ${savedExercises.length}`}
        onPress={() => {
          console.log("Floating button pressed");
          router.push({
            pathname: '/(tabs)/AddExercise',
            params: { savedExercises: JSON.stringify(savedExercises) }, // Pass saved exercises as a stringified object
          });
        }} // Navigate to the saved exercises page
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop:80,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BBF246',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  todayPlanCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  todayPlanImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  todayPlanDetails: {
    flex: 1,
    marginLeft: 15,
  },
  todayPlanName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  todayPlanInfo: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  statusTag: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF5722',
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  // seeMoreButton: {
  //   marginTop: 10,
  //   backgroundColor: '#BBF246',
  //   paddingVertical: 8,
  //   paddingHorizontal: 15,
  //   borderRadius: 5,
  //   alignSelf: 'flex-end',
  // },
  // seeMoreText: {
  //   color: '#121212',
  //   fontSize: 14,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  seeMoreButton: {
    marginTop: 10,
  },
  seeMoreText: {
    fontSize: 14,
    color: '#BBF246',
    textDecorationLine: 'underline',
  },
  saveButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF5722',
  },
});
