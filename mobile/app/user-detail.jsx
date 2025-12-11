import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAdminStore } from '../context/AdminStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DeactivateUserModal from '../components/DeactivateUserModal';
import DeleteUserModal from '../components/DeleteUserModal';
import BackButton from '../components/BackButton';

export default function UserDetail() {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const { fetchUserById, deactivateUser, activateUser, deleteUser: deleteUserFromStore } = useAdminStore();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = await fetchUserById(userId);
      setUser(userData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load user details');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleEditPress = () => {
    router.push({ pathname: '/edit-user', params: { userId: user._id } });
  };

  const handleDeactivateConfirm = async () => {
    try {
      await deactivateUser(user._id);
      await loadUser();
      setShowDeactivateModal(false);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to deactivate user');
    }
  };

  const handleActivateConfirm = async () => {
    try {
      await activateUser(user._id);
      await loadUser();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to activate user');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUserFromStore(user._id);
      router.back();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#f59e0b" />
        <Text style={{ marginTop: 10, fontFamily: 'Poppins_400Regular', color: '#78350f' }}>
          Loading user details...
        </Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  const isDeactivated = user.status !== 'active';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <BackButton onPress={() => router.back()} />

      {/* User Profile + Details */}
      <View style={[styles.userProfile, isDeactivated && styles.deactivatedProfile]}>
        <View style={styles.hexagonAvatar}>
          <MaterialCommunityIcons
            name="hexagon"
            size={170}
            color={isDeactivated ? '#d1d5db' : '#FA9F40'}
            style={styles.hexagonBg}
          />
          <Text style={[styles.avatarLetter, isDeactivated && { opacity: 0.5 }]}>
            {user.name ? user.name[0].toUpperCase() : "U"}
          </Text>
        </View>
        <Text style={[styles.profileName, isDeactivated && styles.deactivatedText]}>{user.name}</Text>
        <Text style={[styles.profileEmail, isDeactivated && styles.deactivatedText]}>{user.email}</Text>

        <View style={styles.detailsGrid}>
          <View style={[styles.detailBox, isDeactivated && styles.deactivatedDetailBox]}>
            <Text style={[styles.detailLabel, isDeactivated && styles.deactivatedText]}>Student ID</Text>
            <Text style={[styles.detailValue, isDeactivated && styles.deactivatedText]}>
              {user.studentId || 'N/A'}
            </Text>
          </View>
          <View style={[styles.detailBox, isDeactivated && styles.deactivatedDetailBox]}>
            <Text style={[styles.detailLabel, isDeactivated && styles.deactivatedText]}>Joined Date</Text>
            <Text style={[styles.detailValue, isDeactivated && styles.deactivatedText]}>
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </Text>
          </View>
          <View style={[styles.detailBox, isDeactivated && styles.deactivatedDetailBox]}>
            <Text style={[styles.detailLabel, isDeactivated && styles.deactivatedText]}>Last Active</Text>
            <Text style={[styles.detailValue, isDeactivated && styles.deactivatedText]}>
              {user.lastActive ? (() => {
                const now = new Date();
                const past = new Date(user.lastActive);
                const diffMs = now - past;
                const diffMins = Math.floor(diffMs / 60000);
                const diffHours = Math.floor(diffMs / 3600000);
                const diffDays = Math.floor(diffMs / 86400000);
                if (diffMins < 1) return 'Just now';
                if (diffMins < 60) return `${diffMins}m ago`;
                if (diffHours < 24) return `${diffHours}h ago`;
                if (diffDays < 7) return `${diffDays}d ago`;
                return past.toLocaleDateString();
              })() : 'N/A'}
            </Text>
          </View>
          <View style={[styles.detailBox, isDeactivated && styles.deactivatedDetailBox]}>
            <Text style={[styles.detailLabel, isDeactivated && styles.deactivatedText]}>Status</Text>
            <Text style={[styles.detailValue, isDeactivated && styles.deactivatedText]}>
              {user.status === 'active' ? 'Active' : 'Deactivated'}
            </Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={[styles.statsRow, isDeactivated && styles.deactivatedStatsRow]}>
        <View style={[styles.statBox, isDeactivated && styles.deactivatedDetailBox]}>
          <MaterialCommunityIcons name="file-document-edit-outline" size={30} color={isDeactivated ? '#6b7280' : '#FA9F40'} />
          <Text style={[styles.statNumber, isDeactivated && styles.deactivatedText]}>
            {user.stats?.quizzes || 0}
          </Text>
          <Text style={[styles.statLabel, isDeactivated && styles.deactivatedText]}>Quizzes</Text>
        </View>
        <View style={[styles.statBox, isDeactivated && styles.deactivatedDetailBox]}>
          <MaterialCommunityIcons name="cards-outline" size={27} color={isDeactivated ? '#6b7280' : '#FA9F40'} />
          <Text style={[styles.statNumber, isDeactivated && styles.deactivatedText]}>
            {user.stats?.flashcards || 0}
          </Text>
          <Text style={[styles.statLabel, isDeactivated && styles.deactivatedText]}>Flashcards</Text>
        </View>
        <View style={[styles.statBox, isDeactivated && styles.deactivatedDetailBox]}>
          <MaterialCommunityIcons name="pencil-outline" size={30} color={isDeactivated ? '#6b7280' : '#FA9F40'} />
          <Text style={[styles.statNumber, isDeactivated && styles.deactivatedText]}>
            {user.stats?.notes || 0}
          </Text>
          <Text style={[styles.statLabel, isDeactivated && styles.deactivatedText]}>Notes</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsCard}>
        <Text style={styles.actionsTitle}>User Actions</Text>

        <TouchableOpacity
          style={[styles.editButton, isDeactivated && styles.disabledButton]}
          onPress={handleEditPress}
          disabled={isDeactivated}
        >
          <Text style={[styles.editButtonText, isDeactivated && styles.disabledButtonText]}>Edit User</Text>
        </TouchableOpacity>

        {user.status === 'active' ? (
          <TouchableOpacity style={styles.deactivateButton} onPress={() => setShowDeactivateModal(true)}>
            <Text style={styles.deactivateButtonText}>Deactivate User</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.activateButton} onPress={handleActivateConfirm}>
            <Text style={styles.activateButtonText}>Activate User</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.deleteButton, isDeactivated && styles.disabledButton]}
          onPress={() => setShowDeleteModal(true)}
          disabled={isDeactivated}
        >
          <Text style={[styles.deleteButtonText, isDeactivated && styles.disabledButtonText]}>Delete User</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <DeactivateUserModal
        visible={showDeactivateModal}
        onConfirm={handleDeactivateConfirm}
        onCancel={() => setShowDeactivateModal(false)}
      />
      <DeleteUserModal
        visible={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
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
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginTop: 40,
  },

  userProfile: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FDEBA1',
  },
  deactivatedProfile: {
    backgroundColor: '#f3f4f6',
    opacity: 0.6,
  },

  hexagonAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 120,
    marginBottom: 20,
    position: 'relative',
  },
  hexagonBg: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
  avatarLetter: {
    color: '#fff',
    fontSize: 90,
    fontFamily: 'Poppins_600SemiBold',
    zIndex: 1,
    top: 29,
    position: 'absolute',
    left: 8,
    right: 0,
    textAlign: 'center',
  },

  profileName: {
    fontSize: 24,
    fontFamily: 'Poppins_500Medium',
    color: '#1A1D16',
    marginBottom: 8,
    marginTop: 25,
  },
  profileEmail: {
    fontSize: 15,
    color: '#A25C30',
    marginTop: -10,
    marginBottom: 10,
  },

  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  detailBox: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#FFFBF0',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDEBA1',
    alignItems: 'center',
  },
  deactivatedDetailBox: {
    backgroundColor: '#e5e7eb',
    borderColor: '#d1d5db',
  },

  detailLabel: {
    fontSize: 11,
    color: '#A25C30',
    marginBottom: 4,
    fontFamily: 'Poppins_500Medium',
  },
  detailValue: {
    fontSize: 13,
    color: '#1A1D16',
    fontFamily: 'Poppins_400Regular',
  },
  deactivatedText: {
    color: '#6b7280',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 34,
  },
  deactivatedStatsRow: {
    opacity: 0.6,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDEBA1',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#A25C30',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 11,
    color: '#A25C30',
    marginTop: 2,
  },

  actionsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FDEBA1',
    gap: 12,
    marginBottom: 40,
  },
  actionsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1D16',
    marginBottom: 8,
  },

  editButton: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fde68a',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#f59e0b',
  },

  deactivateButton: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fed7aa',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  deactivateButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#ea580c',
  },

  activateButton: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  activateButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#16a34a',
  },

  deleteButton: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#dc2626',
  },

  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#e5e7eb',
    borderColor: '#d1d5db',
  },
  disabledButtonText: {
    color: '#6b7280',
  },
});
