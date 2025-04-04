// RegisterScreen.js
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
import { Link } from 'react-router-native'; // Import Link

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleRegister = () => {
        if (!firstName || !lastName || !phoneNumber || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (!agreeTerms) {
            Alert.alert('Error', 'Please agree to the Terms & Conditions.');
            return;
        }

        Alert.alert('Success', 'Registration successful!');
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
                        <Text style={styles.title}>Welcome to GroceryMind</Text>
                        <Text style={styles.subtitle}>Create an account</Text>
                        <Text style={styles.loginText}>
                            Already have an account?{' '}
                            <Link to="/login" style={styles.loginLink}>
                                Login
                            </Link>
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="First name"
                            placeholderTextColor="#BDBDBD"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            placeholderTextColor="#BDBDBD"
                            value={lastName}
                            onChangeText={setLastName}
                        />
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

                    <View style={styles.termsContainer}>
                        <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)}>
                            <View style={styles.checkbox}>
                                {agreeTerms && <View style={styles.checkboxInner} />}
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.termsText}>
                            I agree to the{' '}
                            <Text style={styles.termsLink}>Terms & Conditions</Text>
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>Create account</Text>
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
    loginText: {
        fontSize: moderateScale(14),
        color: '#689F38',
        marginBottom: verticalScale(20),
        textAlign: 'center',
    },
    loginLink: {
        color: '#2E7D32',
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
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    checkbox: {
        width: scale(22),
        height: verticalScale(22),
        borderWidth: 1,
        borderColor: '#A5D6A7',
        marginRight: scale(10),
        borderRadius: moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A5D6A7',
    },
    checkboxInner: {
        width: scale(14),
        height: verticalScale(14),
        backgroundColor: '#2E7D32',
        borderRadius: moderateScale(2),
    },
    termsText: {
        fontSize: moderateScale(14),
        color: '#689F38',
    },
    termsLink: {
        color: '#2E7D32',
    },
    registerButton: {
        backgroundColor: '#2E7D32',
        paddingVertical: verticalScale(12),
        borderRadius: moderateScale(8),
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    registerButtonText: {
        fontSize: moderateScale(18),
        color: '#F0F4C3',
        fontWeight: 'bold',
    },
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default RegisterScreen;
