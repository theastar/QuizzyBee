import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import BackButton from "../components/BackButton";
import { useAuthStore } from "../context/AuthStore";

function EditProfile() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { user, updateProfile, isLoading } = useAuthStore();

    // Parse profile data from params or use user data from AuthStore
    const initialProfile = params.profile ? JSON.parse(params.profile) : {
        name: user?.name || "Student",
        email: user?.email || "student@example.com",
        id: user?.studentId || "2023341289",
        course: user?.course || "",
        year: user?.year || "",
        bio: user?.bio || "",
    };

    const [form, setForm] = useState(initialProfile);

    function updateField(key, value) {
        setForm(prev => ({ ...prev, [key]: value }));
    }

    async function saveChanges() {
        if (!user?._id) {
            Alert.alert("Error", "User not found. Please log in again.");
            return;
        }

        // Call the update profile API
        const result = await updateProfile(
            user._id,
            form.name,
            form.course,
            form.year,
            form.bio
        );

        if (result.success) {
            Alert.alert(
                "Success",
                "Profile updated successfully!",
                [
                    {
                        text: "OK",
                        onPress: () => router.back()
                    }
                ]
            );
        } else {
            Alert.alert("Error", result.error || "Failed to update profile");
        }
    }

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
                <Text style={styles.title}>Edit Profile Details</Text>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#A25C30"
                    value={form.name}
                    onChangeText={v => updateField("name", v)}
                    editable={!isLoading}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, styles.idInput]}
                    editable={false}
                    value={form.email}
                    placeholder="Email"
                    placeholderTextColor="#A25C30"
                />

                <Text style={styles.label}>Student ID</Text>
                <TextInput
                    style={[styles.input, styles.idInput]}
                    editable={false}
                    value={form.id}
                    placeholder="Student ID"
                    placeholderTextColor="#A25C30"
                />

                <Text style={styles.label}>Course / Department (Optional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Course / Department"
                    placeholderTextColor="#808080"
                    value={form.course}
                    onChangeText={v => updateField("course", v)}
                    editable={!isLoading}
                />

                <Text style={styles.label}>Year Level / Section (Optional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Year Level / Section"
                    placeholderTextColor="#808080"
                    value={form.year}
                    onChangeText={v => updateField("year", v)}
                    editable={!isLoading}
                />

                <Text style={styles.label}>Bio (Optional)</Text>
                <TextInput
                    style={[styles.input, styles.bioInput]}
                    placeholder="Bio"
                    placeholderTextColor="#808080"
                    value={form.bio}
                    onChangeText={v => updateField("bio", v)}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    editable={!isLoading}
                />

                <TouchableOpacity
                    style={[styles.saveBtn, isLoading && styles.saveBtnDisabled]}
                    onPress={saveChanges}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FFFBF0" />
                    ) : (
                        <Text style={styles.saveText}>Save Changes</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default EditProfile;

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
    label: {
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
        color: "#1A1D16",
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        fontSize: 14,
        padding: 12,
        borderWidth: 2,
        borderColor: "#FDEBA1",
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        fontFamily: "Poppins_400Regular",
        color: "#A25C30",
    },
    idInput: {
        backgroundColor: "#D4D4D4",
        color: "#A25C30",
    },
    bioInput: {
        minHeight: 80,
    },
    saveBtn: {
        marginTop: 24,
        padding: 14,
        backgroundColor: "#FF8927",
        borderRadius: 10,
        alignItems: "center",
    },
    saveBtnDisabled: {
        backgroundColor: "#CCC",
    },
    saveText: {
        color: "#FFFBF0",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
    },
});
