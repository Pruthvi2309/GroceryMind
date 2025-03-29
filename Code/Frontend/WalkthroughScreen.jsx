import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://10.69.73.30:5000";

const { width, height } = Dimensions.get("window");

const WalkthroughScreen = ({ navigation }) => {
  const [remindDays, setRemindDays] = useState("");

  const handleApply = async () => {
    if (!remindDays || isNaN(remindDays) || parseInt(remindDays) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid number of days.");
      return;
    }

    try {
        const token = await AsyncStorage.getItem("token");   // Correct token retrieval
        const profileResponse = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
      });

        const userId = profileResponse.data._id;  // Correctly retrieve userId

        await axios.post(`${API_BASE_URL}/api/users/setReminderDays`, {
            userId,
            reminderDays: parseInt(remindDays),
        });

        Alert.alert("Reminder Set", `Best Before ${remindDays} days`, [
            { text: "OK", onPress: () => navigation.replace("Home") },
        ]);
    } catch (error) {
        Alert.alert("Error", "Failed to set reminder days.");
        console.error(error);
    }
}

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require("./assets/Walkthrough.png")} style={styles.backgroundImage} />

      {/* Transparent Overlay */}
      <View style={styles.overlay} />

     
      {/* Logo */}
      <Text style={styles.logo}>GROCERYMIND</Text>

      {/* Walkthrough Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Set Expiry Reminder</Text>
        <Text style={styles.subtitle}>
          Enter how many days before expiration you'd like to be reminded.
        </Text>

        {/* Input Field for Days */}
        <TextInput
          style={styles.input}
          placeholder="Enter Days (e.g., 5)"
          value={remindDays}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) setRemindDays(text); // Only allows numbers
          }}
          keyboardType="numeric"
        />

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      </View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    top: 100,
    textAlign: "center",
  },
  contentContainer: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 30,
    paddingBottom: 50, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    opacity: 0.9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  applyButton: {
    backgroundColor: "#007BFF",
    padding: 14,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    // position: "absolute",
    // top: 250,
    // // right: 20,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 18,
  }
});

export default WalkthroughScreen;
