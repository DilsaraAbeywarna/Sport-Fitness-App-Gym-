import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Profile() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('Personal'); // Default selected tab

  const router = useRouter()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUsername = (await AsyncStorage.getItem('username')) || '';
        const storedEmail = (await AsyncStorage.getItem('email')) || '';
        const storedProfileImage = await AsyncStorage.getItem('profileImage');

        if (storedUsername && storedEmail) {
          setUsername(storedUsername);
          setEmail(storedEmail);
          setProfileImage(storedProfileImage);
        } else {
          Alert.alert('No user data found.');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while retrieving user data.');
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('profileImage');
      Alert.alert('Logged out successfully!');
      router.push('/loginScreen');
      //navigation.replace('loginScreen'); // Navigate to the Login screen
    } catch (error) {
      Alert.alert('Error', 'An error occurred during logout.');
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header Section */}
        <View style={styles.header}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/images/default-profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Personal' && styles.activeTab]}
            onPress={() => setSelectedTab('Personal')}>
            <Text style={selectedTab === 'Personal' ? styles.activeTabText : styles.tabText}>Personal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'General' && styles.activeTab]}
            onPress={() => setSelectedTab('General')}>
            <Text style={selectedTab === 'General' ? styles.activeTabText : styles.tabText}>General</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Notifications' && styles.activeTab]}
            onPress={() => setSelectedTab('Notifications')}>
            <Text style={selectedTab === 'Notifications' ? styles.activeTabText : styles.tabText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Help' && styles.activeTab]}
            onPress={() => setSelectedTab('Help')}>
            <Text style={selectedTab === 'Help' ? styles.activeTabText : styles.tabText}>Help</Text>
          </TouchableOpacity>
        </View>

        {/* Content for each tab */}
        <View style={styles.tabContent}>
          {selectedTab === 'Personal' && <Text style={styles.contentText}>This is the Personal section.</Text>}
          {selectedTab === 'General' && <Text style={styles.contentText}>This is the General section.</Text>}
          {selectedTab === 'Notifications' && <Text style={styles.contentText}>This is the Notifications section.</Text>}
          {selectedTab === 'Help' && <Text style={styles.contentText}>This is the Help section.</Text>}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={20} color="#1F1F1F" style={styles.logoutIcon} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F', // Dark background
    padding: 20,
    paddingTop: 80,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#292929', // Slightly lighter dark for contrast
    paddingVertical: 40,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#BBF246', // Primary color for the border
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF', // White text for username
  },
  email: {
    fontSize: 16,
    color: '#BBBBBB', // Light gray for email text
  },
  tabsContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#292929', // Dark background for inactive tabs
    marginVertical: 5,
  },
  activeTab: {
    backgroundColor: '#BBF246', // Primary color for active tabs
  },
  tabText: {
    fontSize: 16,
    color: '#BBF246', // Primary color for inactive tab text
  },
  activeTabText: {
    fontSize: 16,
    color: '#1F1F1F', // Dark text for active tab
  },
  tabContent: {
    marginVertical: 20,
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    color: '#FFFFFF', // White text for tab content
  },
  logoutIcon: {
    marginRight: 10, // Add spacing between the icon and the text
  },
  logoutButton: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center them vertically
    width: '100%',
    backgroundColor: '#BBF246', // Primary color for Logout button
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center', // Center the content
    shadowColor: '#BBF246',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  
  logoutButtonText: {
    color: '#1F1F1F', // Dark text for Logout button
    fontWeight: 'bold',
    fontSize: 16,
  },
});
