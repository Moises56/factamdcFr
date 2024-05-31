import { Text, View, StyleSheet, Image, FlatList, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const InicioScreen = ({ navigation }) => {
  return (
    <View>
      {/* crear enlaces para ir a login, mostrar una imagen  */}
      <Image
        source={{ uri: "https://laguitos.s3.amazonaws.com/LOGOWEB.png" }}
        style={styles.headerImage}
      />
      <Text style={styles.title}>Factura AMDC</Text>
      {/* login */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Login")}
        style={{ margin: 10 }}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
});

export default InicioScreen;
