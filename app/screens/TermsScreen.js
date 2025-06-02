import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function TermsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Terms of Services</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.brandContainer}>
                <Text style={styles.brandIcon}>🛡️</Text>
                <Text style={styles.brandText}>Vision Shield</Text>
                <TouchableOpacity style={styles.signInButton}>
                    <Text style={styles.signInText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Legal</Text>
                    <TouchableOpacity style={styles.legalItem}>
                        <Text style={styles.legalItemText}>VisionShield - Terms of Service</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.effectiveDate}>Effective Date: May 14th 2024</Text>

                <Text style={styles.termsText}>
                    Please read these Terms of Service ("Terms") carefully before using the VisionShield application.
                    By accessing or using the app, you agree to be bound by these Terms. If you do not agree, you
                    may not access or use the service.
                </Text>

                <View style={styles.section}>
                    <Text style={styles.sectionNumber}>1. Overview</Text>
                    <Text style={styles.sectionContent}>
                        VisionShield is a document security application that uses facial recognition, encryption, and digital
                        watermarking technologies to prevent unauthorized access and leakage of confidential documents.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionNumber}>2. Eligibility</Text>
                    <Text style={styles.sectionContent}>
                        We use cookies to provide, improve, protect, and promote our services. Visit our Privacy Policy
                        and Privacy Policy FAQ to learn more. You can manage your personal preferences in our Cookie Consent Tool.
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.acceptButton}>
                        <Text style={styles.acceptButtonText}>Accept All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.declineButton}>
                        <Text style={styles.declineButtonText}>Decline</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    doneButton: {
        fontSize: 16,
        color: '#4A90E2',
        fontWeight: '500',
    },
    brandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    brandIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    brandText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A90E2',
        flex: 1,
    },
    signInButton: {
        marginRight: 15,
    },
    signInText: {
        fontSize: 16,
        color: '#4A90E2',
    },
    menuIcon: {
        fontSize: 20,
        color: '#333',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginVertical: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    legalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    legalItemText: {
        fontSize: 16,
        color: '#4A90E2',
    },
    chevron: {
        fontSize: 16,
        color: '#ccc',
    },
    effectiveDate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 15,
    },
    termsText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 20,
    },
    sectionNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    buttonContainer: {
        marginVertical: 30,
    },
    acceptButton: {
        backgroundColor: '#333',
        borderRadius: 8,
        paddingVertical: 15,
        marginBottom: 15,
    },
    acceptButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    declineButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 15,
    },
    declineButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
