import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import React from "react";

function DashboardScreen({ navigation }) {
  async function signOut() {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userType");
    navigation.navigate("Login");
  }

  return (
    <View>
      <Text>DashboardScreen</Text>
      <Button
        mode="contained"
        title="Log Out"
        onPress={signOut}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Log Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginLeft: 100,
  },
  button: {
    backgroundColor: "#5ccedf",
    width: "50%",
    borderRadius: 5,
    marginVertical: 5,
    marginLeft: 100,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default DashboardScreen;
