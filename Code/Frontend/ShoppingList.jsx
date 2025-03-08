import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert, Modal
} from 'react-native';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";

const API_BASE_URL = "http://10.69.74.34:5000";

const ShoppingList = () => {
    const [lists, setLists] = useState([]);
    const [newItemName, setNewItemName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedListId, setSelectedListId] = useState(null);

    const fetchLists = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/shopping-list`);
            setLists(response.data);
            if (response.data.length > 0) {
                setSelectedListId(response.data[0]._id); // Auto-select first list for adding items
            }
        } catch (error) {
            Alert.alert("Error", "Failed to fetch shopping lists.");
        }
    };

    const addItem = async () => {
        if (!newItemName.trim() || quantity <= 0) {
            Alert.alert("Error", "Please provide a valid item name and quantity.");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/shopping-list/add-item/${selectedListId}`, {
                itemName: newItemName,
                quantity
            });
            setNewItemName('');
            setQuantity(1);
            setModalVisible(false);
            fetchLists();
        } catch (error) {
            Alert.alert("Error", "Failed to add item.");
        }
    };

    const toggleBought = async (listId, itemId) => {
        try {
            await axios.put(`${API_BASE_URL}/api/shopping-list/mark-bought/${listId}/${itemId}`);
            fetchLists();
        } catch (error) {
            Alert.alert("Error", "Failed to update item.");
        }
    };

    const deleteItem = async (listId, itemId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/shopping-list/delete-item/${listId}/${itemId}`);
            fetchLists();
        } catch (error) {
            Alert.alert("Error", "Failed to delete item.");
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shopping List</Text>

            <FlatList
                data={lists}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>{item.title} | Date: {item.date}</Text>

                        {item.items.map((i) => (
                            <View key={i._id} style={styles.itemRow}>
                                <Text style={styles.itemName}>{i.itemName}</Text>
                                <Text style={styles.itemQty}>Qty: {i.quantity}</Text>
                                <TouchableOpacity onPress={() => toggleBought(item._id, i._id)}>
                                    <Ionicons 
                                        name={i.checked ? "checkmark-circle" : "ellipse-outline"} 
                                        size={24} 
                                        color={i.checked ? "green" : "grey"} 
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteItem(item._id, i._id)}>
                                    <Ionicons 
                                        name="trash-outline" 
                                        size={24} 
                                        color="red" 
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            />

            {/* Plus Icon to Open Modal */}
            <TouchableOpacity 
                style={styles.plusButton}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add-circle-outline" size={50} color="orange" />
            </TouchableOpacity>

            {/* Modal for Adding Items */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Add Item</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Item Name"
                            value={newItemName}
                            onChangeText={setNewItemName}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Quantity"
                            keyboardType="numeric"
                            value={quantity.toString()}
                            onChangeText={(text) => setQuantity(parseInt(text) || 1)}
                        />

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={addItem}
                        >
                            <Text style={styles.addButtonText}>Add Item</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#fff" },
    header: { fontSize: 24, textAlign: 'center', marginBottom: 10 },
    card: { backgroundColor: "#eee", padding: 10, borderRadius: 8, marginBottom: 10 },
    itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    itemName: { flex: 1 },
    itemQty: { paddingHorizontal: 10 },
    input: { borderColor: "#ddd", borderWidth: 1, padding: 8, borderRadius: 5, marginBottom: 10 },
    plusButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: "transparent"
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center"
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    addButton: {
        backgroundColor: "green",
        width: "100%",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 10
    },
    addButtonText: { color: "#fff", fontWeight: "bold" },
    cancelButton: {
        backgroundColor: "red",
        width: "100%",
        padding: 10,
        alignItems: "center",
        borderRadius: 5
    },
    cancelButtonText: { color: "#fff", fontWeight: "bold" }
});

export default ShoppingList;
