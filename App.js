import * as React from "react";
import * as font from "expo-font";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from "@react-navigation/native";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

// icons
import Icon from "react-native-vector-icons/Entypo";

// Components
import InicioScreen from "./src/screens/InicioScreen";
import HomeScreen from "./src/screens/HomeScreens";
import DashboardScreen from "./src/screens/DashboardScreen";
import MarketDetailScreen from "./src/screens/Market/MarketDetailScreen";
import UserScreen from "./src/screens/Auth/UserScreen";
import ProfileScreen from "./src/screens/Auth/ProfileScreen";
import FacturaScreens from "./src/screens/Facturas/FacturaScreens";
import LocalScreens from "./src/screens/Market/LocalScreens";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import RegisterPage from "./src/screens/Auth/RegisterScreen";
import PrintBleScreens from "./src/screens/PrintBle/PrintBleScreens";

// Drawer Content
import DrawerContent from "./DrawerContent";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        borderLeftWidth: 7,
        width: "90%",
        height: 70,
        borderRightColor: "green",
        borderRightWidth: 7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{
        borderLeftColor: "red",
        borderLeftWidth: 7,
        width: "90%",
        height: 70,
        borderRightColor: "red",
        borderRightWidth: 7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#5ccedf",
        headerStyle: {
          backgroundColor: "#5ccedf",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Market"
        component={MarketDetailScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Local"
        component={LocalScreens}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Factura"
        component={FacturaScreens}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PrinBle"
        component={PrintBleScreens}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="LoginUser" component={LoginNav} />
    </Stack.Navigator>
  );
};

const DraweNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Inicio" component={StackNav} />
    </Drawer.Navigator>
  );
};

const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Home" component={DraweNav} />
      <Stack.Screen name="AdminScreen" component={AdminStack} />
    </Stack.Navigator>
  );
};

const AdminStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          statusBarColor: "#5ccedf",
          headerShown: true,
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: "#5ccedf",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
        name="Iniciar"
        component={InicioScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginNav}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    const userType1 = await AsyncStorage.getItem("userType");
    setIsLoggedIn(data);
    setUserType(userType1);
  }

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
    getData();
    setTimeout(() => {
      // SplashScreen.hide();
    }, 900);
  }, [isLoggedIn]);

  const loadFonts = async () => {
    await font.loadAsync({
      gilroy: require("./assets/fonts/Gilroy-Medium.ttf"),
    });
    setFontsLoaded(true);
  };

  return (
    <NavigationContainer>
      {isLoggedIn && userType === "admin" ? (
        <AdminStack />
      ) : isLoggedIn ? (
        <DraweNav />
      ) : (
        <LoginNav />
      )}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
