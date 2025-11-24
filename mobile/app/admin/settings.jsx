import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function Settings() {
  const [notifications, setNotifications] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.subheader}>Customize your app preferences.</Text>

      <View style={styles.settingCard}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.settingText}>Dark Mode (Coming Soon)</Text>
        <Switch value={false} disabled />
      </View>
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
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FDEBA1',
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#1A1D16',
  },
});
