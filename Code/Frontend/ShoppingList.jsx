import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";

const API_BASE_URL = "http://10.69.73.63:5000";

const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [newItemName, setNewItemName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [listId, setListId] = useState("");  
    const [loading, setLoading] = useState(false); 

    // Fetch Shopping List
const fetchShoppingList = async () => {
    try {
        const token = await AsyncStorage.getItem("token"); // Correctly retrieve token

        if (!token) {
            console.error("No token found.");
            Alert.alert("Error", "No token found. Please login again.");
            return;
        }

        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/shopping-list`, {
            headers: { Authorization: `Bearer ${token}` } // Correct token format
        });

        setShoppingList(response.data.items || []);
        setListId(response.data._id);
    } catch (error) {
        console.error("Error fetching shopping list:", error.response?.data || error.message);
        Alert.alert("Error", "Failed to fetch shopping lists.");
    } finally {
        setLoading(false);
    }
};

    const addItem = async () => {
        if (!newItemName.trim() || quantity <= 0) {
            Alert.alert("Error", "Please provide valid item details.");
            return;
        }

        try {
            const token = await AsyncStorage.getItem("token");  // Ensure token is retrieved correctly
            if (!token) {
                console.error("Token is missing");
                Alert.alert("Error", "Authorization token is missing.");
                return;
            }

            setLoading(true);
            await axios.post(`${API_BASE_URL}/api/shopping-list/add-item`, {
                itemName: newItemName,
                quantity
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchShoppingList();
            setNewItemName('');
            setQuantity(1);  
        } catch (error) {
            console.error("Error adding item:", error.response?.data || error.message);
            Alert.alert("Error", error.response?.data?.message || "Failed to add item.");
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            console.log("Item ID to delete:", itemId);
            const token = await AsyncStorage.getItem("token");  // Ensure token is retrieved correctly
            if (!token) {
                console.error("Token is missing");
                Alert.alert("Error", "Authorization token is missing.");
                return;
            }
        
            setLoading(true);
            await axios.delete(`${API_BASE_URL}/api/shopping-list/delete-item/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        
            fetchShoppingList();  // Re-fetch the shopping list after deletion
        } catch (error) {
            console.error("Error deleting item:", error.response?.data || error.message);
            Alert.alert("Error", error.response?.data?.message || "Failed to delete item.");
        } finally {
            setLoading(false);
        }
    };
    
    
    useEffect(() => {
        fetchShoppingList();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shopping List</Text>

            <View style={styles.addItemContainer}>
                <TextInput
                    placeholder="Item Name"
                    style={styles.input}
                    value={newItemName}
                    onChangeText={setNewItemName}
                />

                <TextInput
                    placeholder="Qty"
                    keyboardType="numeric"
                    style={styles.input}
                    value={quantity.toString()}
                    onChangeText={(text) => setQuantity(parseInt(text) || 1)}
                />

                <TouchableOpacity style={styles.addButton} onPress={addItem}>
                    <Text style={styles.addButtonText}>Add Item</Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />}

            <ScrollView style={styles.listContainer}>
                {shoppingList.map((item) => (
                    <View key={item._id} style={styles.itemRow}>
                        <Text style={styles.itemName}>{item.itemName}</Text>
                        <Text>Qty: {item.quantity}</Text>

                        <TouchableOpacity onPress={() => deleteItem(item._id)}>
  <Ionicons name="trash" size={24} color="red" />
</TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff", paddingTop: 60 },
    header: { fontSize: 24, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
    listContainer: { marginBottom: 20 },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
    itemName: { fontWeight: 'bold' },
    deleteButton: { color: "red" },

    // Add Item Section at Top
    addItemContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
    input: { flex: 1, borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 5, marginRight: 5 },
    addButton: { backgroundColor: "green", padding: 10, borderRadius: 5 },
    addButtonText: { color: "#fff", fontWeight: "bold" },

    // Loader
    loader: { marginTop: 20 }
});

export default ShoppingList;
