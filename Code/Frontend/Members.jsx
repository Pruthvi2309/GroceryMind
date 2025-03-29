import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert, Modal
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://10.69.73.30:5000";

const Members = ({ navigation }) => {
    const [members, setMembers] = useState([]);
    const [newMemberName, setNewMemberName] = useState("");
    const [newContactNumber, setNewContactNumber] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState("");

    // Fetch User ID from AsyncStorage
    const fetchUserId = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserId(response.data._id);
        } catch (error) {
            console.error("Failed to fetch user ID:", error);
        }
    };

    // Fetch Members
    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/members/${userId}`);
            setMembers(response.data);
        } catch (error) {
            setMembers([]); // If no members are found, show empty UI
        }
    };

    // Add New Member
    const addMember = async () => {
      const contactNumberPattern = /^\d{10}$/; // Ensures 10-digit number only
  
      if (!newMemberName.trim() || !newContactNumber.trim()) {
          Alert.alert("Error", "Please provide valid name and contact number.");
          return;
      }
  
      if (!contactNumberPattern.test(newContactNumber)) {
          Alert.alert("Error", "Contact number must be exactly 10 digits.");
          return;
      }
      if (!userId) {
        Alert.alert("Error", "User ID is missing.");
        return;
    }
  
      try {
          await axios.post(`${API_BASE_URL}/api/members/add`, {
              name: newMemberName,
              contactNo: newContactNumber,
              userId: userId
          });
          setNewMemberName('');
          setNewContactNumber('');
          setModalVisible(false);
          fetchMembers();
      } catch (error) {
          Alert.alert("Error", error.response?.data?.message || "Failed to add member.");
      }
    };

    // Delete Member
    const deleteMember = async (memberId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/members/remove/${memberId}`);
            fetchMembers();
        } catch (error) {
            Alert.alert("Error", "Failed to delete member.");
        }
    };

    useEffect(() => {
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchMembers();
        }
    }, [userId]);

    return (
        <View style={styles.container}>
            {/* Back Arrow with Page Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.header}>Members</Text>
            </View>

            {/* Show Members or "Add Member" Instruction */}
            {members.length === 0 ? (
                <View style={styles.noMemberContainer}>
                    <Text style={styles.noMemberText}>No members yet. Add a member now!</Text>
                </View>
            ) : (
                <FlatList
                    data={members}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.memberName}>{item.name}</Text>
                            <TouchableOpacity onPress={() => deleteMember(item._id)}>
                                <Ionicons 
                                    name="trash-outline" 
                                    size={24} 
                                    color="red" 
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {/* Blue Plus Icon to Open Modal */}
            <TouchableOpacity 
                style={styles.plusButton}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add-circle" size={60} color="#007BFF" />
            </TouchableOpacity>

            {/* Modal for Adding Members */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Add Member</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={newMemberName}
                            onChangeText={setNewMemberName}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Contact Number"
                            keyboardType="numeric"
                            value={newContactNumber}
                            onChangeText={setNewContactNumber}
                        />

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={addMember}
                        >
                            <Text style={styles.addButtonText}>Add Member</Text>
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
    container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#fff" },

    headerContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20 
    },

    header: { 
        fontSize: 24, 
        textAlign: 'center', 
        flex: 1 
    },

    card: { 
        backgroundColor: "#eee", 
        padding: 15, 
        borderRadius: 8, 
        marginBottom: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },

    memberName: { 
        flex: 1, 
        textAlign: 'left' 
    },

    noMemberContainer: {
        alignItems: 'center',
        marginVertical: 20
    },

    noMemberText: {
        fontSize: 16,
        color: "#666"
    },

    input: { 
        borderColor: "#ddd", 
        borderWidth: 1, 
        padding: 10, 
        borderRadius: 5, 
        marginBottom: 10, 
        width: '100%' 
    },

    plusButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: "transparent"
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

    addButton: {
        backgroundColor: "#007BFF",
        width: "100%",
        padding: 12,
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 10
    },

    addButtonText: { 
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

export default Members;
