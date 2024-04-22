import * as React from "react";
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
// icons
import Icon from "react-native-vector-icons/Entypo";

// Components
import HomeScreen from "./src/screens/HomeScreens";
import DashboardScreen from "./src/screens/DashboardScreen";
import MarketDetailScreen from "./src/screens/Market/MarketDetailScreen";
import UserScreen from "./src/screens/Auth/UserScreen";
import ProfileScreen from "./src/screens/Auth/ProfileScreen";
import FacturaScreens from "./src/screens/Facturas/FacturaScreens";
import LocalScreens from "./src/screens/Market/LocalScreens";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import RegisterPage from "./src/screens/Auth/RegisterScreen";

// Drawer Content
import DrawerContent from "./DrawerContent";

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
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                size={30}
                color="#fff"
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            );
          },
        }}
      />
      <Stack.Screen name="Market" component={MarketDetailScreen} />
      <Stack.Screen name="Local" component={LocalScreens} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Factura" component={FacturaScreens} />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: true,
        }}
      />
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
      <Drawer.Screen name="Home" component={StackNav} />
    </Drawer.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={DraweNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
