import React from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  
  const backgroundColor = '#25292e';  // This should match the background color of your screen

  return (
    <View style={{ flex: 1 }}>
      {/* Customize StatusBar to match screen background color */}
      <StatusBar
        barStyle="light-content"  // Light text for dark background status bar
        backgroundColor={backgroundColor}  // Dynamically match the status bar color to the screen background
        translucent={false}  // Ensure the status bar is solid (not translucent)
      />
      
      <ImageBackground
        source={require('../assets/images/WelcomeScreenImage.jpg')} // Background image
        style={[styles.backgroundImage, { backgroundColor }]} // Apply same background color
        resizeMode="cover"
      >
        {/* Gradient Overlay for better visibility */}
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.titleHighlight}>FitQuest</Text>
            <Text style={styles.subtitle}>
              Track your progress, stay motivated, and achieve your goals!
            </Text>
            <CustomButton
              title="Get Started"
              onPress={() => router.push('/loginScreen')}
              style={styles.button}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark gradient overlay
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '300',
    color: '#fff',
    textAlign: 'center',
  },
  titleHighlight: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#BBF246', // Highlight color
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#f9f9f9',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#BBF246',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
