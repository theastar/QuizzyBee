import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ResetCodeModal({ visible, resetCode, onContinue, onClose }) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#A25C30" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Reset Code Sent!</Text>
                    <Text style={styles.bodyText}>
                        Your password reset code is:
                    </Text>

                    <View style={styles.codeContainer}>
                        <Text style={styles.codeText}>{resetCode}</Text>
                    </View>

                    <Text style={styles.noteText}>
                        Please save this code to reset your password.
                    </Text>

                    <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default ResetCodeModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.14)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: "#FFFBF0",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#FDEBA1",
        padding: 24,
        width: 370,
        position: "relative",
    },
    closeBtn: {
        position: "absolute",
        top: 12,
        right: 12,
        padding: 8,
        zIndex: 10,
    },
    title: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 20,
        color: "#1A1D16",
        marginBottom: 12,
        textAlign: "center",
        marginTop: 8,
    },
    bodyText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        color: "#1A1D16",
        marginBottom: 16,
        textAlign: "center",
    },
    codeContainer: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#F59E0B",
        padding: 20,
        marginBottom: 16,
        alignItems: "center",
    },
    codeText: {
        fontFamily: "Poppins_700Bold",
        fontSize: 32,
        color: "#F59E0B",
        letterSpacing: 8,
    },
    noteText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        color: "#A25C30",
        textAlign: "center",
        marginBottom: 4,
    },
    continueBtn: {
        backgroundColor: "#F59E0B",
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
        marginTop: 16,
    },
    continueText: {
        fontFamily: "Poppins_500Medium",
        color: "#fff",
        fontSize: 16,
    },
});
