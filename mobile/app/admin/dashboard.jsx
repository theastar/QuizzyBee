import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAdminStore } from '../../context/AdminStore';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AdminDashboard() {
  const router = useRouter();
  const { stats, recentActivity, loading, error, fetchStats, fetchRecentActivity } = useAdminStore();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([
        fetchStats(),
        fetchRecentActivity(4)
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to load dashboard data');
    }
  };

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return past.toLocaleDateString();
  };

  const handleUserPress = (user) => {
    router.push({
      pathname: '/user-detail',
      params: { userId: user._id }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Greeting */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>Hello, Admin!</Text>
      </View>

      {loading ? (
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#f59e0b" />
          <Text style={{ marginTop: 10, fontFamily: 'Poppins_400Regular', color: '#78350f' }}>
            Loading dashboard...
          </Text>
        </View>
      ) : (
        <>
          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {/* Total Users Card */}
            <LinearGradient colors={['#fbbf24', '#f59e0b', '#ea580c']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={styles.statHeader}>
                  <View>
                    <Text style={styles.statLabel}>TOTAL USERS</Text>
                    <View style={styles.statValueRow}>
                      <Text style={styles.statValue}>{stats.totalUsers}</Text>
                      <View style={styles.liveBadge}>
                        <Text style={styles.liveBadgeText}>Active</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.statIcon}>
                    <MaterialCommunityIcons name="account-multiple-outline" size={30} color="#fff" />
                  </View>
                </View>
              </View>
            </LinearGradient>

            {/* Total Quizzes Card */}
            <LinearGradient colors={['#fb923c', '#f97316', '#dc2626']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={styles.statHeader}>
                  <View>
                    <Text style={styles.statLabel}>TOTAL QUIZZES</Text>
                    <View style={styles.statValueRow}>
                      <Text style={styles.statValue}>{stats.totalQuizzes}</Text>
                      <View style={styles.liveBadge}>
                        <Text style={styles.liveBadgeText}>Published</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.statIcon}>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={30} color="#fff" />
                  </View>
                </View>
              </View>
            </LinearGradient>

            {/* Total Flashcards Card */}
            <LinearGradient colors={['#facc15', '#eab308', '#f59e0b']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={styles.statHeader}>
                  <View>
                    <Text style={styles.statLabel}>TOTAL FLASHCARDS</Text>
                    <View style={styles.statValueRow}>
                      <Text style={styles.statValue}>{stats.totalFlashcards}</Text>
                      <View style={styles.liveBadge}>
                        <Text style={styles.liveBadgeText}>Created</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.statIcon}>
                    <MaterialCommunityIcons name="cards-outline" size={27} color="#fff" />
                  </View>
                </View>
              </View>
            </LinearGradient>

            {/* Total Notes Card */}
            <LinearGradient colors={['#fbbf24', '#eab308', '#d97706']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.statCard}>
              <View style={styles.statCardContent}>
                <View style={styles.statHeader}>
                  <View>
                    <Text style={styles.statLabel}>TOTAL NOTES</Text>
                    <View style={styles.statValueRow}>
                      <Text style={styles.statValue}>{stats.totalNotes}</Text>
                      <View style={styles.liveBadge}>
                        <Text style={styles.liveBadgeText}>Saved</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.statIcon}>
                    <MaterialCommunityIcons name="pencil-outline" size={30} color="#fff" />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Recent Login Activity */}
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>Recent Login Activity</Text>
            </View>
            <View style={styles.activityList}>
              {recentActivity.length > 0 ? (
                recentActivity.map((user) => (
                  <TouchableOpacity key={user._id} style={styles.activityItem} onPress={() => handleUserPress(user)} activeOpacity={0.7}>
                    <View style={styles.activityItemLeft}>
                      <View>
                        <Text style={styles.activityItemNameText}>{user.name}</Text>
                        <Text style={styles.activityItemEmail}>{user.email}</Text>
                      </View>
                    </View>
                    <Text style={styles.activityItemTime}>
                      {user.lastActive ? getRelativeTime(user.lastActive) : 'N/A'}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={{ fontFamily: 'Poppins_400Regular', color: '#6b7280', textAlign: 'center' }}>
                  No recent activity
                </Text>
              )}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF0',
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 6,
  },
  greetingText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 30,
    color: '#1A1D16',
    alignSelf: 'flex-start',
  },
  statsGrid: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 10,
    gap: 8,
  },
  statCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statCardContent: {
    gap: 14,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 40,
    color: '#fff',
  },
  liveBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  liveBadgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#fff',
  },
  statIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityCard: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#FDEBA1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  activityHeader: {
    marginBottom: 14,
  },
  activityTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#1A1D16',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDEBA1',
    borderRadius: 12,
    backgroundColor: '#FFFBF0',
  },
  activityItemLeft: {
    flex: 1,
  },
  activityItemNameText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
    color: '#1A1D16',
  },
  activityItemEmail: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#A25C30',
    marginTop: 2,
  },
  activityItemTime: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: '#6b7280',
  },
});
