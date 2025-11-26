import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAdminStore } from '../../context/AdminStore';

export default function AdminUsers() {
  const router = useRouter();
  const { users } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users (ALL users, no role check)
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleUserPress = (user) => {
    router.push({
      pathname: '/user-detail',
      params: { userId: user.id }
    });
  };

  return (
    <View style={styles.container}>
      {/* Search Card */}
      <View style={styles.searchCard}>
        <Text style={styles.searchTitle}>Search Users</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#6b7280" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Name, email, or student ID..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Users List */}
      <ScrollView style={styles.usersList} showsVerticalScrollIndicator={false}>
        {/* User Count */}
        <View style={styles.userCount}>
          <Text style={styles.userCountText}>
            Showing {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {filteredUsers.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={[
              styles.userCard,
              user.status === 'deactivated' && styles.userCardDeactivated,
            ]}
            onPress={() => handleUserPress(user)}
            activeOpacity={0.7}
          >
            <View style={styles.userCardContent}>
              <View style={styles.userNameRow}>
                <Text style={styles.userName}>{user.name}</Text>

                {user.status === 'deactivated' && (
                  <View style={styles.deactivatedBadge}>
                    <Text style={styles.deactivatedBadgeText}>Deactivated</Text>
                  </View>
                )}
              </View>

              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {filteredUsers.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No users found matching your search.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF0',
    paddingHorizontal: 20,
    paddingTop: 40, 
  },
  searchCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FDEBA1',
    marginBottom: 10,
    marginTop: 30,
  },
  searchTitle: {
    fontSize: 20,
    color: '#78350f',
    marginBottom: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDEBA1',
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: '#1f2937',
    fontFamily: 'Poppins_400Regular',
  },
  userCount: {
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  userCountText: {
    fontSize: 13,
    color: '#78350f',
    fontFamily: 'Poppins_400Regular',
  },
  usersList: {
    flex: 1,
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FDEBA1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userCardDeactivated: {
    opacity: 0.6,
  },
  userCardContent: {
    gap: 6,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  userName: {
    fontSize: 16,
    color: '#1A1D16',
    fontFamily: 'Poppins_500Medium',
  },
  userEmail: {
    fontSize: 14,
    color: '#A25C30',
    fontFamily: 'Poppins_400Regular',
  },
  deactivatedBadge: {
    backgroundColor: '#E53935',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  deactivatedBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
  emptyState: {
    marginTop: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#6b7280',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
});
