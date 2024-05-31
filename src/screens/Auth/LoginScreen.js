import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, getUserByToken } from "../../services/AuthService";
import { useBluetooth } from "../../screens/PrintBle/BluetoothContext";

const { width, height } = Dimensions.get("window");

function LoginScreen() {
  const navigation = useNavigation();
  const { printInvoice, setLoggedInUser } = useBluetooth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para el spinner

  useEffect(() => {
    // Verificar si hay un token almacenado localmente
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          // Si hay un token, intentar verificar su validez
          const response = await getUserByToken(token);
          if (response.status === "ok") {
            // Si la verificación es exitosa, redirigir al usuario a la pantalla correspondiente
            const userType = await AsyncStorage.getItem("userType");
            if (userType === "admin") {
              navigation.navigate("Home");
            } else {
              navigation.navigate("Market");
            }
          } else {
            // Si la verificación falla, mostrar una alerta y limpiar los datos de autenticación almacenados
            Alert.alert(
              "Token expired",
              "Your session has expired. Please log in again."
            );
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("isLoggedIn");
            await AsyncStorage.removeItem("userType");
            await AsyncStorage.removeItem("loggedInUser");
            await AsyncStorage.removeItem("loggedInEmail");
          }
        }
      } catch (error) {
        console.error("Error checking auth token:", error);
      }
    };

    checkAuthToken();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    let valid = true;
    if (!email || !validateEmail(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (!valid) {
      return;
    }

    setLoading(true); // Mostrar el spinner

    const data = {
      correo: email,
      contrasena: password,
    };

    loginUser(data)
      .then((res) => {
        setLoading(false); // Ocultar el spinner

        if (res.status === "ok") {
          Alert.alert(res.message);
          AsyncStorage.setItem("token", res.data);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
          AsyncStorage.setItem("userType", res.rol);
          AsyncStorage.setItem("loggedInUser", res.user);
          AsyncStorage.setItem("loggedInEmail", email);

          setLoggedInUser(res.user);
          printInvoice({
            usuario: res.user,
          });

          if (res.rol === "admin") {
            navigation.navigate("Home");
          } else {
            navigation.navigate("Market");
          }
        } else {
          if (res.message.includes("Correo no válido")) {
            setEmailError(true);
          } else if (res.message.includes("Contraseña incorrecta")) {
            setPasswordError(true);
          }
          Alert.alert("Error", res.message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setLoading(false); // Ocultar el spinner en caso de error
        Alert.alert("Error", "Ocurrió un error al intentar iniciar sesión.");
      });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={"always"}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/logos/Logo_Belleza.png")}
        />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.text_header}>AMDC</Text>
        <View style={[styles.action, emailError ? styles.inputError : null]}>
          <FontAwesome name="user-o" color="#5ccedf" style={styles.smallIcon} />
          <TextInput
            placeholder="Correo"
            style={styles.textInput}
            onChange={(e) => {
              setEmail(e.nativeEvent.text);
              setEmailError(false);
            }}
          />
        </View>
        {emailError && (
          <Text style={styles.errorMessage}>Correo no válido</Text>
        )}
        <View style={[styles.action, passwordError ? styles.inputError : null]}>
          <FontAwesome name="lock" color="#5ccedf" style={styles.smallIcon} />
          <TextInput
            placeholder="Contraseña"
            style={styles.textInput}
            secureTextEntry
            onChange={(e) => {
              setPassword(e.nativeEvent.text);
              setPasswordError(false);
            }}
          />
        </View>
        {passwordError && (
          <Text style={styles.errorMessage}>Contraseña requerida</Text>
        )}

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          >
            <Text style={styles.forgotPasswordText}>Olvidé mi contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.inBut}
          onPress={handleSubmit}
          disabled={loading} // Deshabilitar el botón mientras se muestra el spinner
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.textSign}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: height,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 220,
    height: 220,
  },
  loginContainer: {
    width: "100%",
  },
  text_header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5ccedf",
    textAlign: "center",
    marginBottom: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    alignItems: "center",
    borderRadius: 10, // Bordes redondeados
    borderWidth: 1, // Ancho del borde
    borderColor: "#5ccedf", // Color del borde
    padding: 10, // Relleno para que el borde no se superponga con el contenido
  },
  inputError: {
    borderColor: "red",
  },
  smallIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: "#05375a",
    height: 40,
  },
  errorMessage: {
    color: "red",
    marginTop: 5,
  },
  forgotPasswordContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 8,
    marginRight: 10,
  },
  forgotPasswordText: {
    color: "#5ccedf",
    fontWeight: "700",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  inBut: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#5ccedf",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default LoginScreen;
