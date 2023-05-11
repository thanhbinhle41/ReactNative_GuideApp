import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import TabNavigator from "./src/navigation/TabNavigator";
import Toast from "react-native-toast-message";

import { Provider } from "react-redux";
import { store } from "./src/store/store";
import AppLoader from "./src/components/AppLoader";

const Stack = createNativeStackNavigator();

function App() {
  const CustomDefaultTheme = {
    colors: {
      background: "#ffffff",
      text: "#333333",
    },
  };

  return (
    <>
    <Provider store={store}>
      <AppLoader/>
      <NavigationContainer theme={CustomDefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast></Toast>
    </Provider>
    </>
  );
}

export default App;
