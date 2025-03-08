// // App.js
// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { NativeRouter, Route, Routes } from 'react-router-native';
// import RegisterScreen from './RegisterScreen';
// import LoginScreen from './LoginScreen';
// import Walkthrough from './Walkthrough';
// import Register from './Register';
// import Login from './Login';

// export default function App() {
//     return (
//         <NativeRouter>
//             <View style={styles.container}>
//                 {/* <Routes>
//                 <Route exact path="/" component={RegisterScreen} />
//                 <Route path="/login" component={LoginScreen} />
//                 </Routes> */}
//                 {/* <LoginScreen/> */}
//                 {/* <RegisterScreen/> */}
//                 {/* <Walkthrough/> */}
//                 {/* <Register/> */}
//                 <Login/>
//             </View>
//         </NativeRouter>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });


import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import WalkthroughScreen from "./WalkthroughScreen";
import HomeScreen from "./HomeScreen";
import ShoppingList from "./ShoppingList";
import Members from "./Members";
import Profile from "./Profile";
import AboutGroceryMind from "./AboutGroceryMind";
import { Ionicons } from "@expo/vector-icons";

// Stack Navigator for Auth Screens
const Stack = createStackNavigator();

// Bottom Tab Navigator for Footer
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "MyFood") {
          iconName = "fast-food-outline";
        } else if (route.name === "ShoppingList") {
          iconName = "cart-outline";
        } else if (route.name === "Members") {
          iconName = "people-outline";
        } else if (route.name === "Profile") {
          iconName = "person-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#007BFF",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}
  >
    <Tab.Screen name="MyFood" component={HomeScreen} />
    <Tab.Screen name="ShoppingList" component={ShoppingList} />
    <Tab.Screen name="Members" component={Members} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

// Main App Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="AboutGroceryMind" component={AboutGroceryMind} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



