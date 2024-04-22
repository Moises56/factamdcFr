const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} = require("react-native");
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { log } from "react-native-reanimated";
import { loginUser } from "../../services/AuthService";
// import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen({ props }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const data = {
      correo: email,
      contrasena: password,
    };
    // console.log("Data: ", data);

    loginUser(data)
      .then((res) => {
        console.log(res.data);
        if (res.status === "ok") {
          Alert.alert(res.message);
          AsyncStorage.setItem("token", res.data);
          navigation.navigate("Home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps={"always"}
    >
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../../assets/logos/Logo_Belleza.png")}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>AMDC</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#5ccedf"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Correo"
              style={styles.textInput}
              onChange={(e) => {
                setEmail(e.nativeEvent.text);
              }}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#5ccedf" style={styles.smallIcon} />
            <TextInput
              placeholder="Contraseña"
              style={styles.textInput}
              onChange={(e) => {
                setPassword(e.nativeEvent.text);
              }}
            />
          </View>

          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginTop: 8,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "#5ccedf", fontWeight: "700" }}>
              Olvidé mi contraseña
            </Text>
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.inBut}
            onPress={() => {
              handleSubmit();
            }}
          >
            <View>
              <Text style={styles.textSign}>Iniciar Session</Text>
            </View>
          </TouchableOpacity>
          <View style={{ padding: 15 }}>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#919191" }}
            >
              ----O Continúe como----
            </Text>
          </View>

          <View style={styles.bottomButton}>
            {/* <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity style={styles.inBut2}>
              <FontAwesome
                name="user-circle-o"
                color="white"
                style={styles.smallIcon2}
              />
            </TouchableOpacity>
            <Text style={styles.bottomText}>Guest</Text>
          </View> */}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <FontAwesome
                  name="user-plus"
                  color="white"
                  style={[styles.smallIcon2, { fontSize: 30 }]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Registrate</Text>
            </View>
            {/* <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={styles.inBut2}
              onPress={() => alert("Coming Soon")}
            >
              <FontAwesome
                name="google"
                color="white"
                style={[styles.smallIcon2, { fontSize: 30 }]}
              />
            </TouchableOpacity>
            <Text style={styles.bottomText}>Google</Text>
          </View> */}
            {/* <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={styles.inBut2}
              onPress={() => alert("Coming Soon")}
            >
              <FontAwesome
                name="facebook-f"
                color="white"
                style={[styles.smallIcon2, { fontSize: 30 }]}
              />
            </TouchableOpacity>
            <Text style={styles.bottomText}>Facebook</Text>
          </View> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default LoginScreen;
