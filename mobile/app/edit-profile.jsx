import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import BackButton from "../components/BackButton";

function EditProfile() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Parse profile data from params
    const initialProfile = params.profile ? JSON.parse(params.profile) : {
        name: "Student",
        email: "student@example.com",
        id: "2023341289",
        course: "",
        year: "",
        bio: "",
    };

    const [form, setForm] = useState(initialProfile);

    function updateField(key, value) {
        setForm(prev => ({ ...prev, [key]: value }));
    }

    function saveChanges() {
        // Navigate back with updated profile data
        router.push({
            pathname: "/tabs/settings",
            params: { updatedProfile: JSON.stringify(form) }
        });
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
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#A25C30"
                    value={form.email}
                    onChangeText={v => updateField("email", v)}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                />

                <Text style={styles.label}>Year Level / Section (Optional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Year Level / Section"
                    placeholderTextColor="#808080"
                    value={form.year}
                    onChangeText={v => updateField("year", v)}
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
                />

                <TouchableOpacity style={styles.saveBtn} onPress={saveChanges}>
                    <Text style={styles.saveText}>Save Changes</Text>
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
    saveText: {
        color: "#FFFBF0",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
    },
});
