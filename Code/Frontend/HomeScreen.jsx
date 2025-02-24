// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Modal,
//   StyleSheet,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";

// const HomeScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [expiryDate, setExpiryDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [categories, setCategories] = useState({
//     Fruits: true,
//     Vegetables: true,
//     Meat: true,
//   });

//   const toggleCategory = (category) => {
//     setCategories((prev) => ({ ...prev, [category]: !prev[category] }));
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header & Search Bar */}
//       <View style={styles.header}>
//         <Text style={styles.logo}>GroceryMind</Text>
//         <View style={styles.icons}>
//           <Ionicons name="notifications-outline" size={24} color="black" />
//           <Ionicons name="filter-outline" size={24} color="black" style={{ marginLeft: 10 }} />
//         </View>
//       </View>
//       <TextInput style={styles.searchBar} placeholder="Search items..." />

//       {/* Categories */}
//       {Object.keys(categories).map((category) => (
//         <View key={category}>
//           <TouchableOpacity
//             style={styles.categoryHeader}
//             onPress={() => toggleCategory(category)}
//           >
//             <Text style={[styles.categoryText, { color: getCategoryColor(category) }]}>
//               {category}
//             </Text>
//             <Ionicons
//               name={categories[category] ? "chevron-up-outline" : "chevron-down-outline"}
//               size={24}
//               color="black"
//             />
//           </TouchableOpacity>

//           {categories[category] && (
//             <FlatList
//               data={getCategoryItems(category)}
//               keyExtractor={(item) => item.name}
//               renderItem={({ item }) => (
//                 <View style={styles.itemCard}>
//                   <Text style={styles.itemName}>{item.name}</Text>
//                   <Text style={styles.expiryText}>Expires in {item.expiry} days</Text>
//                 </View>
//               )}
//             />
//           )}
//         </View>
//       ))}

//       {/* Floating Add Button */}
//       <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
//         <Ionicons name="add" size={30} color="white" />
//       </TouchableOpacity>

//       {/* Add Item Modal */}
//       <Modal animationType="slide" transparent={true} visible={modalVisible}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Add New Item</Text>
//             <TextInput style={styles.input} placeholder="Item Name" />
//             <View style={styles.quantityContainer}>
//               <Text>Quantity:</Text>
//               <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
//                 <Text style={styles.button}>-</Text>
//               </TouchableOpacity>
//               <Text>{quantity}</Text>
//               <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
//                 <Text style={styles.button}>+</Text>
//               </TouchableOpacity>
//             </View>
//             <TextInput style={styles.input} placeholder="Category (e.g., Fruits)" />
//             <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
//               <Text>Expiry Date: {expiryDate.toDateString()}</Text>
//             </TouchableOpacity>

//             {showDatePicker && (
//               <DateTimePicker
//                 value={expiryDate}
//                 mode="date"
//                 display="default"
//                 onChange={(event, selectedDate) => {
//                   setShowDatePicker(false);
//                   if (selectedDate) setExpiryDate(selectedDate);
//                 }}
//               />
//             )}

//             <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(false)}>
//               <Text style={styles.addButtonText}>Add Item</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setModalVisible(false)}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const getCategoryColor = (category) => {
//   return category === "Fruits" ? "orange" : category === "Vegetables" ? "green" : "red";
// };

// const getCategoryItems = (category) => {
//   const items = {
//     Fruits: [
//       { name: "Lemon", expiry: 6 },
//       { name: "Banana", expiry: 4 },
//     ],
//     Vegetables: [
//       { name: "Carrot", expiry: 5 },
//       { name: "Spinach", expiry: 7 },
//     ],
//     Meat: [{ name: "Chicken", expiry: 3 }],
//   };
//   return items[category] || [];
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 60, padding: 20, backgroundColor: "white" },
//   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   logo: { fontSize: 24, fontWeight: "bold" },
//   icons: { flexDirection: "row" },
//   searchBar: { marginVertical: 10, padding: 10, backgroundColor: "#F0F0F0", borderRadius: 8 },
//   categoryHeader: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
//   categoryText: { fontSize: 18, fontWeight: "bold" },
//   itemCard: { padding: 15, backgroundColor: "#F9F9F9", marginVertical: 5, borderRadius: 10 },
//   itemName: { fontWeight: "bold" },
//   expiryText: { color: "gray" },
//   fab: { position: "absolute", bottom: 30, right: 30, backgroundColor: "blue", padding: 15, borderRadius: 30 },
//   modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
//   modalContent: { width: "80%", padding: 20, backgroundColor: "white", borderRadius: 10 },
//   modalTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   input: { padding: 10, borderWidth: 1, borderRadius: 8, marginVertical: 5 },
//   button: { paddingHorizontal: 10, fontSize: 18 },
//   addButton: { backgroundColor: "blue", padding: 10, borderRadius: 8, alignItems: "center" },
//   addButtonText: { color: "white", fontWeight: "bold" },
//   cancelText: { textAlign: "center", color: "blue", marginTop: 10 },
// });

// export default HomeScreen;

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddNewItemModal from "./AddNewItemModal";

const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Add new item to list
  const addItem = (newItem) => {
    setItems([...items, newItem]);
    setModalVisible(false);
  };

  // Delete item from list
  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
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
            {/* Category Header */}
            <TouchableOpacity style={styles.categoryHeader} onPress={() => toggleCategory(category)}>
              <Text style={[styles.categoryText, categoryColors[category]]}>{category}</Text>
              <Ionicons
                name={expandedCategories[category] ? "chevron-up" : "chevron-down"}
                size={20}
                color="black"
              />
            </TouchableOpacity>

            {/* Category Items (Collapsible) */}
            {expandedCategories[category] &&
              groupedItems[category].map((item, index) => (
                <View style={styles.itemContainer} key={index}>
                  <View>
                    <Text style={styles.itemName}>{item.itemName}</Text>
                    <Text style={styles.expiryText}>
                      Expires in {Math.ceil((item.expiryDate - new Date()) / (1000 * 60 * 60 * 24))} days
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteItem(items.indexOf(item))}>
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Add Item Modal */}
      <AddNewItemModal visible={modalVisible} onClose={() => setModalVisible(false)} onAddItem={addItem} />
    </View>
  );
};

// Category Colors
const categoryColors = {
  Fruits: { color: "orange" },
  Vegetables: { color: "green" },
  Meat: { color: "red" },
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
