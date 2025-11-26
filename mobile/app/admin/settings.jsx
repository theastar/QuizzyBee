import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function AdminSettings() {
  const router = useRouter();

  const [name, setName] = useState('QuizzyBee Admin');
  const [email, setEmail] = useState('admin1@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const handleSave = () => {
    setIsEditingName(false);
    setIsEditingEmail(false);
    console.log({ name, email, password });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.editCard}>
        <Text style={styles.headerText}>Admin Profile</Text>

        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Name</Text>
          <View style={styles.profileRow}>
            {isEditingName ? (
              <TextInput
                ref={nameInputRef}
                style={styles.profileValueInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
              />
            ) : (
              <Text style={styles.profileValue}>{name}</Text>
            )}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setIsEditingName(true);
                setTimeout(() => nameInputRef.current?.focus(), 100);
              }}
            >
              <MaterialIcons name="edit" size={20} color="#A25C30" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.profileRow}>
            {isEditingEmail ? (
              <TextInput
                ref={emailInputRef}
                style={styles.profileValueInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
              />
            ) : (
              <Text style={styles.profileValue}>{email}</Text>
            )}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setIsEditingEmail(true);
                setTimeout(() => emailInputRef.current?.focus(), 100);
              }}
            >
              <MaterialIcons name="edit" size={20} color="#A25C30" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Change Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter new password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color="#A25C30"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Changes */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/')}>
        <MaterialIcons name="logout" size={20} color="#dc2626" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Version & Copyright */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
        <Text style={styles.footerText}>© 2025 QuizzyBee. All rights reserved.</Text>
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
  editCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FDEBA1',
    marginBottom: 20,
    marginTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1D16',
    marginBottom: 16,
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
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDEBA1',
    borderRadius: 12,
    backgroundColor: '#FFFBF0',
  },
  profileValue: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#1A1D16',
  },
  profileValueInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#1A1D16',
    padding: 0,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDEBA1',
    borderRadius: 12,
    backgroundColor: '#FFFBF0',
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#1A1D16',
    paddingVertical: 14,
  },
  eyeButton: {
    padding: 4,
  },
  editButton: {
    padding: 4,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#dc2626',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
