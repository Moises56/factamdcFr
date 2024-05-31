import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { requestPasswordReset } from "../../services/AuthService";

const { width, height } = Dimensions.get("window");

function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para el spinner

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleForgotPassword = () => {
    if (!email || !validateEmail(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    setLoading(true); // Mostrar el spinner

    requestPasswordReset(email)
      .then((res) => {
        setLoading(false); // Ocultar el spinner
        if (res.status === "ok") {
          Alert.alert(
            "Éxito",
            "Se ha enviado un enlace de recuperación a su correo electrónico."
          );
          navigation.navigate("LoginScreen"); // Navegar de regreso a la pantalla de inicio de sesión
        } else {
          Alert.alert("Error", res.message);
        }
      })
      .catch((error) => {
        console.log("Forgot password error: ", error);
        setLoading(false); // Ocultar el spinner en caso de error
        Alert.alert(
          "Error",
          "Ocurrió un error al intentar recuperar la contraseña."
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text_header}>Recuperar Contraseña</Text>
      <View style={[styles.action, emailError ? styles.inputError : null]}>
        <FontAwesome
          name="envelope-o"
          color="#5ccedf"
          style={styles.smallIcon}
        />
        <TextInput
          placeholder="Correo"
          style={styles.textInput}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(false);
          }}
        />
      </View>
      {emailError && <Text style={styles.errorMessage}>Correo no válido</Text>}
      <TouchableOpacity
        style={styles.inBut}
        onPress={handleForgotPassword}
        disabled={loading} // Deshabilitar el botón mientras se muestra el spinner
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.textSign}>Enviar Enlace</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: height,
    paddingHorizontal: 20,
  },
  text_header: {
    color: "#5ccedf",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#5ccedf",
    paddingBottom: 5,
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  smallIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  inputError: {
    borderBottomColor: "red",
  },
  errorMessage: {
    color: "red",
    marginTop: 5,
    alignSelf: "flex-start",
  },
  inBut: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#5ccedf",
    marginTop: 20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default ForgotPasswordScreen;
