import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutGroceryMind = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Vision Section */}
                <Text style={styles.heading}>Our Vision</Text>
                <Text style={styles.text}>
                    To become the leading smart food inventory management platform that revolutionizes 
                    household consumption patterns and reduces global food waste.
                </Text>

                {/* Mission Section */}
                <Text style={styles.heading}>Our Mission</Text>
                <Text style={styles.text}>
                    To empower households with intelligent digital tools for efficient grocery management,
                    promoting sustainable consumption while helping users save money and reduce environmental impact.
                </Text>

                {/* Goals Section */}
                <Text style={styles.heading}>Our Goals</Text>
                <Text style={styles.text}>
                    • Reduce household food waste by 30% through smart inventory tracking and expiry notifications{'\n'}
                    • Achieve 100,000 active users within the first year{'\n'}
                    • Integrate with major grocery retailers for automated inventory updates{'\n'}
                    • Develop AI-powered shopping recommendations based on consumption patterns{'\n'}
                    • Create an engaged community sharing sustainable consumption practices
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    backButton: {
        marginTop: 40,
        marginBottom: 20,
    },
    content: {
        alignItems: 'center',
        paddingBottom: 30
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 10
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
        lineHeight: 24
    }
});

export default AboutGroceryMind;
