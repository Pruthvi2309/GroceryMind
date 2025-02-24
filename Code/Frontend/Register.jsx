import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing eye icon
import { Alert } from "react-native";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const API_BASE_URL = "http://172.16.1.203:5000";

  const handleRegister = async () => {
    if (!firstName.trim()) {
      Alert.alert("Missing First Name", "Please enter your first name.");
      return;
    }
    if (!lastName.trim()) {
      Alert.alert("Missing Last Name", "Please enter your last name.");
      return;
    }
    if (contactNo.length !== 10 || isNaN(contactNo)) {
      Alert.alert("Invalid Contact", "Please enter a valid 10-digit contact number.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }
    // navigation.replace("Walkthrough"); // Move to Walkthrough after successful registration
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        firstName,
        lastName,
        contactNo,
        password,
      });

      if (response.data.token) {
        Alert.alert("Success", "Registration Successful!");
        navigation.replace("Walkthrough"); // Navigate to Walkthrough
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Something went wrong");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require("./assets/Walkthrough.png")} style={styles.backgroundImage} />

      {/* Transparent Overlay */}
      <View style={styles.overlay} />

      {/* Logo Text */}
      <Text style={styles.logo}>GROCERYMIND</Text>

      {/* Signup Section */}
      <View style={styles.signupContainer}>
        <Text style={styles.title}>SIGNUP</Text>
        <Text style={styles.subtitle}>to join the community and to enjoy life.</Text>

        {/* First & Last Name Fields (Side by Side) */}
        <View style={styles.nameContainer}>
          <TextInput 
            style={styles.nameInput} 
            placeholder="First Name" 
            value={firstName} 
            onChangeText={setFirstName} 
          />
          <TextInput 
            style={styles.nameInput} 
            placeholder="Last Name" 
            value={lastName} 
            onChangeText={setLastName} 
          />
        </View>

        {/* Contact Number (Now properly aligned) */}
        <TextInput 
          style={styles.input} 
          placeholder="(123)-456-7890" 
          value={contactNo} 
          onChangeText={(text) => {
            if (text.length <= 10) {  // Restrict to 10 digits
              setContactNo(text.replace(/[^0-9]/g, "")); // Allow only numbers
            }
          }}
          keyboardType="phone-pad" 
        />

        {/* Password with Eye Icon */}
        <View style={styles.passwordWrapper}>
          <TextInput 
            style={styles.passwordInput} 
            placeholder="Password" 
            secureTextEntry={!showPassword} 
            value={password} 
            onChangeText={setPassword} 
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Login & Sign Up Buttons */}
        <Text style={styles.loginText}>Already have an account?{" "} <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>Login here!</Text></Text>

        <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
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
    top: 120,
    textAlign: "center",
  },
  signupContainer: {
    width: "90%",  
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    opacity: 0.9,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  nameInput: {
    width: "48%",  
    height: 50,
    paddingHorizontal: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  input: {
    flexDirection: "row",
    width: "100%",  
    height: 50,  
    paddingHorizontal: 15, 
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 12, 
    justifyContent: "space-between",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 50,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,  
    fontSize: 16,
  },
  loginText: {
    fontSize: 12,
    color: "#444",
    marginVertical: 5,
  },
  loginLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#007BFF",
    padding: 14,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  signupButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Register;
