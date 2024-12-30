import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // import AsyncStorage

const validateStrongPassword = (password: string): string => {
  const lengthPattern = /.{8,}/; // At least 12 characters
  const uppercasePattern = /[A-Z]/; // At least one uppercase letter
  const lowercasePattern = /[a-z]/; // At least one lowercase letter
  const numberPattern = /\d/; // At least one number
  const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character

  if (!lengthPattern.test(password)) {
    return "Password must be at least 8 characters long.";
  }

  if (!uppercasePattern.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!lowercasePattern.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!numberPattern.test(password)) {
    return "Password must contain at least one number.";
  }

  if (!specialCharacterPattern.test(password)) {
    return "Password must contain at least one special character.";
  }

  return "Password is strong!";
};

const validateEmail = (email: string): string => {
  // Regular expression for validating Gmail email format
  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailPattern.test(email)) {
    return "Please enter a valid Gmail address.";
  }
  return "Email is valid.";
};

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();

  const validateForm = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    // Validate email
    const emailValidationResult = validateEmail(email);
    if (emailValidationResult !== "Email is valid.") {
      Alert.alert('Validation Error', emailValidationResult);
      return;
    }

    // Validate password
    const passwordValidationResult = validateStrongPassword(password);
    if (passwordValidationResult !== "Password is strong!") {
      Alert.alert('Validation Error', passwordValidationResult);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    } else {
      setError('');

      // Save user data in AsyncStorage
      try {
        const existingEmail = await AsyncStorage.getItem('email');
        if (existingEmail === email) {
          Alert.alert('Validation Error', 'Email is already registered');
          return;
        }
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password); // For simplicity; handle securely in real-world apps

        // Reset form after successful sign-up
        setUsername('');
        setPassword('');
        setEmail('');
        setConfirmPassword('');

        // Navigate to the HomeScreen upon successful form validation
        router.push({
          pathname: '/(tabs)/HomeScreen',
          params: { username: username },
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to save user data');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

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

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#BBF246" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

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

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#BBF246" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Show error message if validation fails */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={validateForm}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      {/* Link to Login Screen */}
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <Link href="/loginScreen">
          <Text style={styles.signInLink}>Sign In</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  signUpButton: {
    width: '100%',
    backgroundColor: '#BBF246',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#BBF246',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  signUpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  orText: {
    color: '#888',
    marginVertical: 10,
    fontSize: 14,
  },
  signInContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signInText: {
    color: '#ccc',
    fontSize: 14,
  },
  signInLink: {
    color: '#BBF246',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: '#BBF246',
  },
});
