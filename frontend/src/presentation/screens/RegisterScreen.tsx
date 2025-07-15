import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../data/repositories/authRepository';
import { useAuthStore } from '../../infrastructure/stores/authStore';
import { router } from 'expo-router';

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Password must contain at least one uppercase, one lowercase, one number and one special character'
    )
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export const RegisterScreen = () => {
  const { login } = useAuthStore();
  
  const mutation = useMutation({
    mutationFn: authRepository.register,
    onSuccess: (data) => {
      login(data.token, { 
        email: data.email, 
        fullName: data.fullName 
      });
      router.replace('/home');
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <Formik
        initialValues={{ 
          fullName: '', 
          email: '', 
          password: '', 
          confirmPassword: '' 
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          mutation.mutate({
            email: values.email,
            password: values.password,
            fullName: values.fullName
          });
        }}
      >
        {({ 
          handleChange, 
          handleBlur, 
          handleSubmit, 
          values, 
          errors, 
          touched,
          isValid,
          dirty
        }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={[
                styles.input, 
                touched.fullName && errors.fullName ? styles.inputError : null
              ]}
              placeholder="Full Name"
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
              autoCapitalize="words"
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
            
            <TextInput
              style={[
                styles.input, 
                touched.email && errors.email ? styles.inputError : null
              ]}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            
            <TextInput
              style={[
                styles.input, 
                touched.password && errors.password ? styles.inputError : null
              ]}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            
            <TextInput
              style={[
                styles.input, 
                touched.confirmPassword && errors.confirmPassword ? styles.inputError : null
              ]}
              placeholder="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            
            <TouchableOpacity
              style={[
                styles.button,
                (!isValid || !dirty || mutation.isPending) ? styles.buttonDisabled : null
              ]}
              onPress={() => handleSubmit()}
              disabled={!isValid || !dirty || mutation.isPending}
            >
              <Text style={styles.buttonText}>
                {mutation.isPending ? 'Creating Account...' : 'Register'}
              </Text>
            </TouchableOpacity>
            
            {mutation.isError && (
              <Text style={styles.errorText}>
                Registration failed: {mutation.error.message}
              </Text>
            )}

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.replace('/login')}
            >
              <Text style={styles.loginLinkText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 15,
    fontSize: 14,
  },
  button: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 10,
    alignSelf: 'center',
  },
  loginLinkText: {
    color: '#6200ee',
    fontSize: 14,
  },
});