import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuthStore } from '../../infrastructure/stores/authStore';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { authRepository } from '../../data/repositories/authRepository';

export const HomeScreen = () => {
  const { user, logout } = useAuthStore();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: authRepository.getProfile,
  });

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.fullName}</Text>
      <Text>Email: {user?.email}</Text>
      
      {isLoading && <Text>Loading profile...</Text>}
      {error && <Text>Error loading profile</Text>}
      {data && <Text>Last login: {new Date(data.lastLogin).toLocaleString()}</Text>}
      
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});