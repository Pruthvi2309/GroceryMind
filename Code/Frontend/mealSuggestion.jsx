import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const VIMEO_API_KEY = 'd4058ce8c2ce1e6a433d2b9ea0744dca'; // Replace with your Pexels API Key

const MealSuggestion = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [videoResults, setVideoResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to search for videos using the Vimeo API
    const searchVideos = async () => {
        if (searchQuery.trim() === '') return;

        setLoading(true);
        try {
            const response = await axios.get(`https://api.vimeo.com/videos`, {
                headers: {
                    Authorization: `Bearer ${VIMEO_API_KEY}`,
                },
                params: {
                    query: `${searchQuery} recipe`, 
                    per_page: 10, // Number of results to return
                }
            });
            setVideoResults(response.data.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for meal ideas..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.searchButton} onPress={searchVideos}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={videoResults}
                    renderItem={({ item }) => (
                        <View style={styles.videoContainer}>
                            <Image
                                source={{ uri: item.pictures.sizes[2].link }} // Thumbnail image
                                style={styles.thumbnail}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.videoTitle}>{item.name}</Text>
                                <Text style={styles.videoDescription}>
                                    {item.description ? item.description.substring(0, 100) + '...' : 'No description'}
                                </Text>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.videoStats}>Views: {item.stats.plays}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => navigation.navigate('VideoPlayer', { videoUrl: item.link })}
                                >
                                    <Ionicons name="play-circle-outline" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.uri}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 70
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    searchButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    videoContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    thumbnail: {
        width: 120,
        height: 90,
        borderRadius: 8,
    },
    textContainer: {
        marginLeft: 15,
        flex: 1,
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    videoDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    infoContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    videoStats: {
        fontSize: 12,
        color: '#888',
    },
    playButton: {
        marginTop: 10,
        padding: 5,
        backgroundColor: '#007BFF',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
});

export default MealSuggestion;
