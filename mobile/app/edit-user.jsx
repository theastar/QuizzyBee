import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAdminStore } from '../context/AdminStore';
import BackButton from '../components/BackButton';

export default function EditUser() {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const { users, updateUser } = useAdminStore();
  
  const user = users.find(u => u.id === userId);
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [studentId, setStudentId] = useState(user?.studentId || '');

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !studentId.trim()) return;

    updateUser(user.id, {
      name: name.trim(),
      email: email.trim(),
      studentId: studentId.trim(),
    });

    router.back();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topContainer}>
        <BackButton onPress={() => router.back()} />
      </View>

      <View style={styles.editCard}>
        <Text style={styles.headerText}>Edit User Details</Text>

        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.inputField}
            value={name}
            onChangeText={setName}
            placeholder="Enter full name"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Email Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Student ID */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Student ID</Text>
          <TextInput
            style={styles.inputField}
            value={studentId}
            onChangeText={setStudentId}
            placeholder="Enter student ID"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF0',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topContainer: {
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginTop: 40,
  },
  editCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FDEBA1',
    marginBottom: 20,
    marginTop: -2,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1D16',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: '#A25C30',
    marginBottom: 6,
  },
  inputField: {
    backgroundColor: '#FFFBF0',
    borderWidth: 1,
    borderColor: '#FDEBA1',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#1A1D16',
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 12,
  },
  saveButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
});
