import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av'; // Use expo-av for video playback

const VideoPlayer = ({ route }) => {
    const { videoUrl } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Video Player</Text>
            <Video
                source={{ uri: videoUrl }}  // Video URL passed through navigation
                shouldPlay
                useNativeControls
                style={styles.video}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    video: {
        width: '100%',
        height: 300,
    },
});

export default VideoPlayer;
