import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing eye icon
import { Alert } from "react-native";
import axios from "axios"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const API_BASE_URL = "http://10.69.73.63:5000";

  const handleLogin = async () => {
    if (contactNo.length !== 10 || isNaN(contactNo)) {
      Alert.alert("Invalid Contact", "Please enter a valid 10-digit contact number.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }
    // navigation.replace("Walkthrough"); // Move to Walkthrough after successful login
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        contactNo,
        password,
      });

      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token); 
        Alert.alert("Success", "Login Successful!");
        navigation.replace("Home"); // Navigate to Home screen
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

      {/* Login Section */}
      <View style={styles.loginContainer}>
        <Text style={styles.title}>LOGIN</Text>
        <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>

        {/* Contact Number */}
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

        {/* Forgot Password Link */}
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Signup Redirect */}
        <Text style={styles.signupText}>
          Don't have an account?{" "} <Text style={styles.signupLink} onPress={() => navigation.navigate("Register")}>Sign up here!</Text>
        </Text>
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
  loginContainer: {
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
  input: {
    width: "100%",  
    height: 50,  
    paddingHorizontal: 15, 
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 12, 
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
  forgotPassword: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: '60%',
  },
  loginButton: {
    backgroundColor: "#007BFF",
    padding: 14,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupText: {
    fontSize: 14,
    color: "#444",
    marginTop: 15,
  },
  signupLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Login;
