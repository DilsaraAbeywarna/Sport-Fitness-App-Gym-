import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // import AsyncStorage

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Validation Error', 'Username is required.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Password is required.');
      return;
    }

    try {
      // Retrieve stored username and password from AsyncStorage
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');

      // Check if the entered credentials match the stored credentials
      if (username === storedUsername && password === storedPassword) {
        // Reset form after successful login
        setUsername('');
        setPassword('');
        // Proceed with login if credentials match
        router.push({
          pathname: '/(tabs)/HomeScreen',
          params: { username: username },
        });
      } else {
        // Show error if credentials do not match
        setUsername('');
        setPassword('');
        Alert.alert('Login Failed', 'Incorrect username or password.');
      }
    } catch (error) {
      setUsername('');
        setPassword('');
      Alert.alert('Error', 'An error occurred while retrieving user data.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.welcomeText}>Welcome to FitQuest!</Text> */}
      <Text style={styles.title}>Sign In</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#BBF246" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#BBF246" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.socialTitle}>Sign in with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.socialButton, styles.socialButtonApple]}>
          <FontAwesome name="apple" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.socialButtonGoogle]}>
          <FontAwesome name="google" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.socialButtonFacebook]}>
          <FontAwesome name="facebook" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Link to Signup Screen */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <Link href="/signupScreen">
          <Text style={styles.signUpLink}>Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#25292e',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#BBF246',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#BBF246',
    borderRadius: 8,
    backgroundColor: '#333',
    color: '#fff',
    paddingLeft: 40, // For icon spacing
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#BBF246',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#BBF246',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#BBF246',
    marginBottom: 20,
    fontSize: 14,
  },
  socialTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  socialButtonApple: {
    backgroundColor: '#333',
    borderColor: '#000',
  },
  socialButtonGoogle: {
    backgroundColor: '#DB4437',
    borderColor: '#DB4437',
  },
  socialButtonFacebook: {
    backgroundColor: '#4267B2',
    borderColor: '#4267B2',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signUpText: {
    color: '#ccc',
    fontSize: 14,
  },
  signUpLink: {
    color: '#BBF246',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: '#BBF246',
  },
});
