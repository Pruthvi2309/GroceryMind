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
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword"; // Ensure import is correct
import WalkthroughScreen from "./WalkthroughScreen";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Walkthrough" component={WalkthroughScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

