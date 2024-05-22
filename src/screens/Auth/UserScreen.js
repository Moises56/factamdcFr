import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAllUsers, deleteUser } from "../../services/AuthService";

function UserScreen({ navigation }) {
  const [userData, setUserData] = useState("");
  const [allUserData, setAllUserData] = useState([]);

  async function getAllUserData() {
    const token = await AsyncStorage.getItem("token");
    const data = await getAllUsers(token);
    setAllUserData(data);
  }

  useEffect(() => {
    getAllUserData();
  }, []);

  async function signOut() {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userType");
    navigation.navigate("LoginScreen");
  }

  const UserCard = ({ data }) => (
    <View key={data._id} style={styles.card}>
      <Image
        source={{
          uri: data.image || "https://via.placeholder.com/50",
        }}
        style={styles.image}
      />
      <View style={styles.cardDetails}>
        <Text style={styles.name}>{data.nombre}</Text>
        <Text style={styles.email}>{data.numero_empleado}</Text>
        <Text style={styles.userType}>{data.correo}</Text>
      </View>
      <View>
        <Icon
          name="delete"
          size={30}
          color="black"
          onPress={() => handleDeleteUser(data._id)}
        />
      </View>
    </View>
  );

  async function handleDeleteUser(userId) {
    const token = await AsyncStorage.getItem("token");
    try {
      await deleteUser(userId, token);
      getAllUserData();
      Alert.alert("Success", "User deleted successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to delete user!");
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userData.nombre}</Text>
          <Text style={styles.userType}>{userData.numero_empleado}</Text>
          <Text style={styles.userType}>Total Users: {allUserData.length}</Text>
        </View>
        <FlatList
          data={allUserData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => (item.id ? item.id.toString() : null)}
          renderItem={({ item }) => <UserCard data={item} />}
        />
      </View>
      {/* Go Back Button */}
      <Button
        mode="contained"
        title="User"
        onPress={() => navigation.navigate("User")}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Go Back
      </Button>
      {/* Log Out Button */}
      <Button
        mode="contained"
        onPress={signOut}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Log Out
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  userType: {
    fontSize: 18,
    color: "#777777",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#777777",
  },
  button: {
    backgroundColor: "#5ccedf",
    width: "100%",
    borderRadius: 0,
    marginVertical: 5,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default UserScreen;
