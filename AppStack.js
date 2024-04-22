import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
// import homeScreens from "./src/components/screens/homeScreens";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Facturas AMDC!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  Text: {
    color: "#5ccedf",
    fontSize: 30,
    fontWeight: "bold",
  },
});
