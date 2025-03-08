import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const API_BASE_URL = "http://10.69.74.34:5000";

const Profile = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState({ firstName: "", lastName: "" });
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [resetPassword, setResetPassword] = useState("");

    // Fetch user data from MongoDB after login
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    navigation.replace("Login");
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
                    headers: { Authorization: token }
                });

                setUserData(response.data);
            } catch (error) {
                console.error("Profile Fetch Error:", error);
                Alert.alert("Error", "Failed to load profile data.");
                navigation.replace("Login");
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');  // Clear token
        Alert.alert("Logged out successfully!");
        navigation.replace("Login");
    };

    const handleProfileSave = () => {
        setModalVisible(false);
        alert("Profile updated successfully!");
    };

    return (
        <View style={styles.container}>
            {/* Back Arrow with Page Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.header}>Profile</Text>
            </View>

            {/* Profile Image */}
            <View style={styles.profileContainer}>
                <Image 
                    source={require('../GroceryMind/assets/Logo.jpeg')} 
                    style={styles.profileImage} 
                />
                <Text style={styles.profileName}>
                    {userData.firstName} {userData.lastName}
                </Text>
            </View>

            {/* Profile Options */}
            <View style={styles.card}>
                <TouchableOpacity style={styles.option} onPress={() => setModalVisible(true)}>
                    <Text style={styles.optionText}>Profile Setup</Text>
                    <Ionicons name="chevron-forward-outline" size={20} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.option} 
                    onPress={() => navigation.navigate("Walkthrough")}
                >
                    <Text style={styles.optionText}>Expiry Date Reminders</Text>
                    <Ionicons name="chevron-forward-outline" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Food Donation Contacts</Text>
                    <Ionicons name="chevron-forward-outline" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>News</Text>
                    <Ionicons name="chevron-forward-outline" size={20} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.option} 
                    onPress={() => navigation.navigate("AboutGroceryMind")}
                >
                    <Text style={styles.optionText}>About GroceryMind</Text>
                    <Ionicons name="chevron-forward-outline" size={20} />
                </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* Profile Setup Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Profile Setup</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={`${userData.firstName} ${userData.lastName}`}
                            editable={false}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Reset Password"
                            secureTextEntry={true}
                            value={resetPassword}
                            onChangeText={setResetPassword}
                        />

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleProfileSave}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 20
    },

    headerContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20 
    },

    header: { 
        fontSize: 24, 
        textAlign: 'center', 
        flex: 1,
        fontWeight: 'bold'
    },

    profileContainer: {
        alignItems: 'center',
        marginBottom: 30
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
    },

    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#007BFF'
    },

    card: {
        backgroundColor: '#F0F8FF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20
    },

    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },

    optionText: {
        fontSize: 16,
        color: '#000'
    },

    logoutButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },

    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },

    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        alignItems: "center"
    },

    modalHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 15
    },

    input: {
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%'
    },

    saveButton: {
        backgroundColor: "#007BFF",  
        width: "100%",
        padding: 12,
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 10
    },

    saveButtonText: {
        color: "#fff",
        fontWeight: "bold"
    },

    cancelButton: {
        backgroundColor: "transparent",
        width: "100%",
        padding: 12,
        alignItems: "center",
        borderRadius: 5
    },

    cancelButtonText: {
        color: "#007BFF", 
        fontWeight: "bold"
    }
});

export default Profile;
