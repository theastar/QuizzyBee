import React, { useState, useEffect } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet, Pressable, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BackButton from "../components/BackButton";
import { useSettingsStore } from "../context/SettingsStore";
import { useAuthStore } from "../context/AuthStore";

function AppSettings() {
    const router = useRouter();
    const { user } = useAuthStore();
    const {
        pomodoroSetting,
        setPomodoroSetting,
        notificationsEnabled,
        setNotificationsEnabled,
        loadSettings
    } = useSettingsStore();

    const pomodoroOptions = [
        "Short (15/5)",
        "Medium (25/5)",
        "Long (50/10)",
    ];
    const [showDropdown, setShowDropdown] = useState(false);

    // Load settings from backend when component mounts
    useEffect(() => {
        if (user?._id) {
            loadSettings(user._id);
        }
    }, [user]);

    const handlePomodoroChange = (option) => {
        setPomodoroSetting(option, user?._id);
        setShowDropdown(false);
    };

    const handleNotificationToggle = (value) => {
        setNotificationsEnabled(value, user?._id);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.backBtnArea}>
                <BackButton />
            </View>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Settings</Text>

                <Text style={styles.sectionTitle}>General</Text>
                <View style={styles.rowBetween}>
                    <Text style={styles.label}>Notifications</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={handleNotificationToggle}
                        trackColor={{ false: "#E5E5E5", true: "#E17203" }}
                        thumbColor="#FFFBF0"
                        ios_backgroundColor="#E5E5E5"
                    />
                </View>

                <Text style={styles.sectionTitle}>Pomodoro</Text>
                <Pressable
                    style={styles.pomodoroSelect}
                    onPress={() => setShowDropdown((v) => !v)}
                >
                    <Text style={styles.pomodoroText}>{pomodoroSetting}</Text>
                    <Ionicons
                        name={showDropdown ? "chevron-up" : "chevron-down"}
                        size={22}
                        color="#A25C30"
                        style={{ marginLeft: 6 }}
                    />
                </Pressable>
                {showDropdown && (
                    <View style={styles.dropdownBox}>
                        {pomodoroOptions.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={styles.dropdownItem}
                                onPress={() => handlePomodoroChange(option)}
                            >
                                <Text style={styles.dropdownText}>{option}</Text>
                                {pomodoroSetting === option && (
                                    <Ionicons name="checkmark" size={20} color="#E17203" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <Text style={styles.sectionTitle}>About the App</Text>
                <View style={styles.aboutBox}>
                    <Text style={styles.aboutText}>
                        <Text style={styles.aboutBold}>QuizzyBee</Text>
                        {" "}(2025) by Althea Navales and Rogin Lagrosas — your ultimate study companion:{" "}
                        <Text style={{ fontStyle: "italic" }}>
                            Learn Smarter, Quiz Faster, Bee Better.
                        </Text>{" "}
                        🐝
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AppSettings;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFBF0",
    },
    backBtnArea: {
        paddingLeft: 20,
        paddingTop: 1,
        paddingBottom: 10,
        marginTop: -20,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontFamily: "Poppins_600SemiBold",
        color: "#1A1D16",
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: "#1A1D16",
        marginTop: 16,
        marginBottom: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: "#FDEBA1",
        paddingBottom: 4,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    label: {
        color: "#A25C30",
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
    },
    pomodoroSelect: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FDEBA1",
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        marginTop: 4,
        width: "100%",
        justifyContent: "space-between",
    },
    pomodoroText: {
        color: "#A25C30",
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        flex: 1,
    },
    dropdownBox: {
        width: "100%",
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#FDEBA1",
        marginTop: -6,
        marginBottom: 16,
    },
    dropdownItem: {
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#FDEBA1",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownText: {
        color: "#A25C30",
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
    },
    aboutBox: {
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#FDEBA1",
        padding: 12,
        marginTop: 6,
    },
    aboutText: {
        color: "#A25C30",
        fontFamily: "Poppins_500Medium",
        fontSize: 14,
        lineHeight: 21,
        textAlign: "justify",
    },
    aboutBold: {
        fontFamily: "Poppins_600SemiBold",
        fontWeight: "bold",
        color: "#A25C30",
    },
});
