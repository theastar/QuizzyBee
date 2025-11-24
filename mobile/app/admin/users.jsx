import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const usersData = [
  { id: '1', name: 'Alice', role: 'Student' },
  { id: '2', name: 'Bob', role: 'Admin' },
  { id: '3', name: 'Charlie', role: 'Teacher' },
];

export default function Users() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users</Text>
      <Text style={styles.subheader}>Manage your users below.</Text>

      <FlatList
        data={usersData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userRole}>{item.role}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF0',
    padding: 20,
  },
  header: {
    fontSize: 25,
    color: '#1A1D16',
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 40,
    marginBottom: 4,
  },
  subheader: {
    fontSize: 15,
    color: '#A25C30',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 20,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FDEBA1',
    padding: 18,
    marginBottom: 14,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1D16',
  },
  userRole: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#A25C30',
    marginTop: 2,
  },
});
