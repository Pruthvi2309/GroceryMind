import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, Alert 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddNewItemModal from "./AddNewItemModal";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://10.69.73.63:5000";



const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [userId, setUserId] = useState("");
  const [reminderDays, setReminderDays] = useState(3); // Default reminder days

  // Fetch User ID from AsyncStorage
  const fetchUserId = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` } 
    });
    setUserId(response.data._id);
    setReminderDays(response.data.reminderDays || 3);
  };

  // Fetch Food Items
  const fetchFoodItems = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return; // Handle case if no token is available
  
      const response = await axios.get(`${API_BASE_URL}/api/foods`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch food items:", error);
      setItems([]);
    }
  };

  // Fetch Categories for Dropdown
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/categories`);
      setCategories(response.data.map(cat => cat.name)); // Only fetch category names
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Add new item to database
const addItem = async (newItem) => {
  try {
      const token = await AsyncStorage.getItem("token");

      await axios.post(`${API_BASE_URL}/api/foods/add`, {
          userId,
          name: newItem.itemName,
          quantity: newItem.quantity,
          category: newItem.category,
          expiryDate: newItem.expiryDate
      }, {
          headers: { Authorization: `Bearer ${token}` }
      });

      fetchFoodItems();
      setModalVisible(false);
  } catch (error) {
      console.error("Error adding item:", error);
      Alert.alert("Error", "Failed to add food item.");
  }
};

// Delete food item from database
const deleteItem = async (itemId) => {
  try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/foods/delete/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` }
      });

      fetchFoodItems();
  } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "Failed to delete food item.");
  }
};

  // Toggle category expand/collapse
  const toggleCategory = (category) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] ? [...acc[item.category], item] : [item];
    return acc;
  }, {});


  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)); // Days remaining
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchFoodItems();
      fetchCategories();
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>GroceryMind</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Ionicons name="filter-outline" size={24} color="black" />
        </View>
      </View>

      {/* Search Bar */}
      <TextInput style={styles.searchBar} placeholder="Search items..." />

      {/* Render Items Grouped by Category */}
      <FlatList
    data={Object.keys(groupedItems)}
    keyExtractor={(category) => category}
    renderItem={({ item: category }) => (
      <View>
        {/* Category Header with Background Color */}
        <TouchableOpacity 
          style={[
            styles.categoryHeader, 
            { backgroundColor: categoryColors[category] || "white" }  // Apply color to category header
          ]}
          onPress={() => toggleCategory(category)}
        >
          <Text style={styles.categoryText}>
            {category}
          </Text>
          <Ionicons
            name={expandedCategories[category] ? "chevron-up" : "chevron-down"}
            size={20}
            color="black"
          />
        </TouchableOpacity>

        {/* Category Items (Collapsible) */}
        {expandedCategories[category] &&
          groupedItems[category].map((item, index) => {
             const daysLeft = calculateDaysLeft(item.expiryDate);
              const isExpiringSoon = daysLeft <= reminderDays && daysLeft >= 0; // If the item will expire in 3 or fewer days
              return (
            <View style={styles.itemContainer} key={index}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={[styles.expiryText, isExpiringSoon && styles.expiryRed]}>
                      Expires in {daysLeft} days
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteItem(item._id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
              );
    })}
      </View>
    )}
/>


      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Add Item Modal */}
      <AddNewItemModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onAddItem={addItem} 
        categories={categories}
      />
    </View>
  );
};

// Category Colors
const categoryColors = {
  "Fruits": "orange",
  "Vegetables": "green",
  "Meats": "red",
  "Seafood": "#1E90FF",            // Blue for seafood (ocean theme)
  "Dairy Products": "#FFD700",     // Yellow for dairy
  "Eggs": "#F0E68C",               // Light yellow for eggs
  "Grain Products": "#CD853F",     // Brownish for grains
  "Legumes and Pulses": "#8A2BE2", // Purple for legumes
  "Nuts and Seeds": "#D2691E",     // Nutty brown
  "Oils and Fats": "#FF4500",      // Orange for oils
  "Herbs and Spices": "#556B2F",   // Deep green for herbs
  "Condiments and Sauces": "#8B0000", // Deep red for sauces
  "Bakery and Desserts": "#FFB6C1",   // Light pink for bakery
  "Snacks": "#FFA07A",             // Light orange for snacks
  "Beverages": "#00CED1",          // Teal for beverages
  "Frozen Foods": "#4682B4",       // Icy blue for frozen foods
  "Canned Foods": "#8B4513",       // Dark brown for canned foods
  "Prepared and Processed Foods": "#A52A2A", // Dark red for processed
  "Baby Food": "#FF69B4",          // Baby pink for baby food
  "International Cuisine Ingredients": "#DDA0DD", // Light purple for international foods
  "Vegan and Plant-Based Foods": "#32CD32", // Bright green for vegan
  "Breakfast Items": "#F5DEB3",    // Wheat color for breakfast
  "Baking Supplies": "#DEB887",    // Beige for baking
  "Health and Dietary Products": "#ADFF2F", // Neon green for health items
  "Miscellaneous Items": "#A9A9A9", // Grey for miscellaneous
  "Organic and Specialty Foods": "#228B22", // Deep forest green for organic
  "Household Essentials": "#708090", // Slate grey for household
  "Seasonal and Holiday Foods": "#B22222", // Dark red for festive theme
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "white" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logo: { fontSize: 24, fontWeight: "bold" },
  iconContainer: { flexDirection: "row", gap: 15 },
  searchBar: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,         // Rounded corners for category block
    marginBottom: 5, 
  },
  categoryText: { fontSize: 20, fontWeight: "bold" },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  itemName: { fontSize: 18, fontWeight: "bold" },
  expiryText: { fontSize: 14, color: "gray" },
  expiryRed: {
    color: 'red', // Change the color of expiring items to red
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;