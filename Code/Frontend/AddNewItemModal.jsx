import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Modal, StyleSheet 
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const API_BASE_URL = "http://10.69.73.63:5000";

const AddNewItemModal = ({ visible, onClose, onAddItem }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Fetch Categories from Backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/categories`);
        setCategories(response.data);
        setSelectedCategory(response.data[0]?.name || "");
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setExpiryDate(selectedDate);
  };

  const handleAddItem = () => {
    if (!itemName || !selectedCategory) {
      alert("Please fill in all fields.");
      return;
    }

    onAddItem({ itemName, quantity, category: selectedCategory, expiryDate });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Item</Text>

          {/* Item Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
          />

          {/* Quantity Section */}
          <View style={styles.quantityContainer}>
            <Text style={styles.label}>Quantity:</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
              <Ionicons name="remove" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Category Dropdown */}
          <View style={styles.input}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              {categories.map((category) => (
                <Picker.Item 
                  key={category._id} 
                  label={category.name} 
                  value={category.name} 
                />
              ))}
            </Picker>
          </View>

          {/* Expiry Date Picker */}
          <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>Expiry Date: {expiryDate.toDateString()}</Text>
            <Ionicons name="calendar" size={20} color="black" />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={expiryDate}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          {/* Buttons */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  quantityButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelText: {
    fontSize: 14,
    color: "blue",
    marginTop: 10,
  },
});

export default AddNewItemModal;
