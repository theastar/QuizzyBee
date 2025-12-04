import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../context/AuthStore';

export default function AdminSettings() {
  const router = useRouter();
  const { user, changePassword, updateProfile, logout, isLoading } = useAuthStore();

  const [name, setName] = useState(user?.name || 'Admin');
  const [email, setEmail] = useState(user?.email || 'admin@quizzybee.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isSavingName, setIsSavingName] = useState(false);

  const nameInputRef = useRef(null);

  const handleSaveName = async () => {
    if (!name || name.trim().length < 3) {
      Alert.alert("Error", "Name must be at least 3 characters long");
      return;
    }

    setIsSavingName(true);
    const result = await updateProfile(user._id, name, user.course, user.year, user.bio);
    setIsSavingName(false);

    if (result.success) {
      setIsEditingName(false);
    } else {
      Alert.alert("Error", result.error || "Failed to update name");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert("Error", "Please fill in both password fields");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters long");
      return;
    }

    const result = await changePassword(user._id, currentPassword, newPassword);

    if (result.success) {
      Alert.alert("Success", "Password changed successfully!");
      setCurrentPassword('');
      setNewPassword('');
    } else {
      Alert.alert("Error", result.error || "Failed to change password");
    }
  };

  const handleLogout = () => {
    logout();
    router.replace('/');
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
                editable={!isSavingName}
              />
            ) : (
              <Text style={styles.profileValue}>{name}</Text>
            )}
            {isEditingName ? (
              <View style={styles.editActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setName(user?.name || 'Admin');
                    setIsEditingName(false);
                  }}
                  disabled={isSavingName}
                >
                  <MaterialIcons name="close" size={20} color="#dc2626" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveIconButton}
                  onPress={handleSaveName}
                  disabled={isSavingName}
                >
                  {isSavingName ? (
                    <ActivityIndicator size="small" color="#16a34a" />
                  ) : (
                    <MaterialIcons name="check" size={20} color="#16a34a" />
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setIsEditingName(true);
                  setTimeout(() => nameInputRef.current?.focus(), 100);
                }}
              >
                <MaterialIcons name="edit" size={20} color="#A25C30" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={[styles.profileRow, styles.uneditableRow]}>
            <Text style={styles.profileValue}>{email}</Text>
          </View>
        </View>

        {/* Change Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showCurrentPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <MaterialIcons
                name={showCurrentPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color="#A25C30"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password (min 6 characters)"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showNewPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <MaterialIcons
                name={showNewPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color="#A25C30"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Password Button */}
        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleChangePassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
  uneditableRow: {
    backgroundColor: '#D4D4D4',
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
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    padding: 4,
  },
  saveIconButton: {
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
  saveButtonDisabled: {
    backgroundColor: '#CCC',
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
