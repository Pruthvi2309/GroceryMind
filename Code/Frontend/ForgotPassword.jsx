import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const ForgotPassword = ({ navigation }) => {
  const [contactNo, setContactNo] = useState("");

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require("./assets/Walkthrough.png")} style={styles.backgroundImage} />

      {/* Transparent Overlay */}
      <View style={styles.overlay} />

      {/* Forgot Password Section */}
      <View style={styles.forgotContainer}>
        <Text style={styles.title}>Forgot your password?</Text>
        <Text style={styles.subtitle}>
          Enter your contact number below and we’ll get you back on track.
        </Text>

        {/* Contact Number Input */}
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

        {/* Back to Login Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>

        {/* Send OTP Button */}
        <TouchableOpacity style={styles.otpButton}>
          <Text style={styles.otpButtonText}>Send OTP</Text>
        </TouchableOpacity>

        {/* Go to Homepage */}
        <TouchableOpacity>
          <Text style={styles.homepageText}>Go to <Text style={styles.homepageLink}>HOMEPAGE</Text>.</Text>
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
  forgotContainer: {
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
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: "#fff",
    padding: 14,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 10,
  },
  backButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  otpButton: {
    backgroundColor: "#007BFF",
    padding: 14,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  otpButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  homepageText: {
    fontSize: 14,
    color: "#444",
    marginTop: 15,
  },
  homepageLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default ForgotPassword;