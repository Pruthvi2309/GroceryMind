// LoginScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Link } from 'react-router-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!phoneNumber || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        Alert.alert('Success', 'Login successful!');
    };

    const formatPhoneNumber = (text) => {
        const cleaned = ('' + text).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
        if (!match) return text;
        let formatted = '';
        if (match[1]) {
            formatted += '(' + match[1];
            if (match[2]) {
                formatted += ') ' + match[2];
                if (match[3]) {
                    formatted += '-' + match[3];
                }
            }
        }
        return formatted;
    };

    const handlePhoneNumberChange = (text) => {
        const formattedNumber = formatPhoneNumber(text);
        setPhoneNumber(formattedNumber);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome Back!</Text>
                        <Text style={styles.subtitle}>Login to your account</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mobile Number (___)___-____"
                            placeholderTextColor="#BDBDBD"
                            value={phoneNumber}
                            onChangeText={handlePhoneNumberChange}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#BDBDBD"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F4C3',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: scale(30),
        backgroundColor: '#F0F4C3',
    },
    header: {
        marginTop: verticalScale(20),
        marginBottom: verticalScale(30),
    },
    title: {
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        color: '#33691E',
        marginBottom: verticalScale(10),
        textAlign: 'center',
    },
    subtitle: {
        fontSize: moderateScale(20),
        color: '#689F38',
        marginBottom: verticalScale(20),
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: verticalScale(20),
    },
    input: {
        height: verticalScale(48),
        backgroundColor: '#DCEDC8',
        marginBottom: verticalScale(15),
        paddingLeft: scale(15),
        borderRadius: moderateScale(8),
        fontSize: moderateScale(16),
        color: '#33691E',
        borderColor: '#A5D6A7',
        borderWidth: 1,
    },
    loginButton: {
        backgroundColor: '#2E7D32',
        paddingVertical: verticalScale(12),
        borderRadius: moderateScale(8),
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    loginButtonText: {
        fontSize: moderateScale(18),
        color: '#F0F4C3',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
