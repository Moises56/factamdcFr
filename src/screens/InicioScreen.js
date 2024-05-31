import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Text } from "react-native-paper";

const InicioScreen = ({ navigation }) => {
  return (
    <View>
      {/* crear enlaces para ir a login, mostrar una imagen  */}
      <Image
        source={{ uri: "https://amdchn.s3.amazonaws.com/fondo+(1).png" }}
        style={styles.headerImage}
      />
      <Text style={styles.title}>Factura AMDC</Text>
      {/* login */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* <Button
        mode="contained"
        onPress={() => navigation.navigate("Login")}
        style={{ margin: 10 }}
      >
        Login
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  button: {
    // marginVertical: 10,
    // marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#5ccedf",
    borderRadius: 5,
    alignItems: "center",
    width: "50%",
    marginLeft: "25%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InicioScreen;
