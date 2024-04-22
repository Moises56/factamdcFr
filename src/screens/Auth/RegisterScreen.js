const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} = require("react-native");
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Error from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
// import axios from "axios";
import { crearUser } from "../../services/AuthService";

function RegisterPage({ props }) {
  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  // apellido
  const [apellido, setApellido] = useState("");
  const [apellidoVerify, setApellidoVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dni, setDni] = useState("");
  const [dniVerify, setDniVerify] = useState(false);
  // numero_empleado
  const [numero_empleado, setNumero_empleado] = useState("");
  const [numero_empleadoVerify, setNumero_empleadoVerify] = useState(false);

  const navigation = useNavigation();

  // registro de usuario en la base de datos de la aplicacion
  async function handleSubmit() {
    const newUser = {
      nombre: name,
      apellido: apellido,
      dni: dni,
      correo: email,
      contrasena: password,
      telefono: mobile,
      numero_empleado: numero_empleado,
    };
    console.log(newUser);

    try {
      const res = await crearUser(newUser);
      console.log(res);
      Alert.alert(res.message);
      // redireccionar a la pagina de login
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);

    if (nameVar.length > 1) {
      setNameVerify(true);
    }
  }
  // apellido
  function handleApellido(e) {
    const apellidoVar = e.nativeEvent.text;
    setApellido(apellidoVar);
    setApellidoVerify(false);

    if (apellidoVar.length > 1) {
      setApellidoVerify(true);
    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }
  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(false);
    // if (/[6-9]{1}[0-9]{9}/.test(mobileVar)) {
    //   setMobile(mobileVar);
    //   setMobileVerify(true);
    // }

    // de 8 digitos
    if (mobileVar.length === 8) {
      setMobile(mobileVar);
      setMobileVerify(true);
    }
  }
  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }
  // funcion para dni debe ser solo de 13 numeros si ingresan letras o caracteres especiales no se acepta
  function handleDni(e) {
    const dniVar = e.nativeEvent.text;
    // Expresión regular para verificar si el dniVar contiene solo números y tiene una longitud de 13 dígitos
    const validDniRegex = /^[0-9]{13}$/;

    if (validDniRegex.test(dniVar)) {
      // Si el dniVar cumple con los requisitos, establece el estado del DNI y verifica como verdadero
      setDni(dniVar);
      setDniVerify(true);
    } else {
      // Si el dniVar no cumple con los requisitos, establece el estado del DNI y verifica como falso
      setDni("");
      setDniVerify(false);
    }
  }

  // numero_empleado
  function handleNumero_empleado(e) {
    const numero_empleadoVar = e.nativeEvent.text;
    setNumero_empleado(numero_empleadoVar);
    setNumero_empleadoVerify(false);

    if (numero_empleadoVar.length > 1) {
      setNumero_empleadoVerify(true);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      //   keyboardShouldPersistTaps={true}
      style={{ backgroundColor: "white" }}
    >
      <View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../../assets/signUp.png")}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>AMDC</Text>

          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Nombre"
              style={styles.textInput}
              onChange={(e) => handleName(e)}
            />
            {name.length < 1 ? null : nameVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>

          {name.length < 1 ? null : nameVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              El nombre debe tener más de un carácter.
            </Text>
          )}

          {/* Apellido */}
          <View style={styles.action}>
            <FontAwesome
              name="text-width"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Apellido"
              style={styles.textInput}
              onChange={(e) => handleApellido(e)}
            />
            {apellido.length < 1 ? null : apellidoVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>

          {apellido.length < 1 ? null : apellidoVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              El apellido debe tener más de un carácter.
            </Text>
          )}

          {/* dni es de 13 digitos */}
          <View style={styles.action}>
            <FontAwesome
              name="id-card-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="DNI"
              style={styles.textInput}
              onChange={(e) => handleDni(e)}
              maxLength={13}
            />
            {dni.length < 1 ? null : dniVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {dni.length < 1 ? null : dniVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              El DNI debe tener 13 dígitos.
            </Text>
          )}

          <View style={styles.action}>
            <Fontisto
              name="email"
              color="#420475"
              size={24}
              style={{ marginLeft: 0, paddingRight: 5 }}
            />
            <TextInput
              placeholder="Correo"
              style={styles.textInput}
              onChange={(e) => handleEmail(e)}
            />
            {email.length < 1 ? null : emailVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              Introduzca la dirección de correo electrónico correcta
            </Text>
          )}
          <View style={styles.action}>
            <FontAwesome
              name="mobile"
              color="#420475"
              size={35}
              style={{ paddingRight: 10, marginTop: -7, marginLeft: 5 }}
            />
            <TextInput
              placeholder="Teléfono"
              style={styles.textInput}
              onChange={(e) => handleMobile(e)}
              maxLength={10}
            />
            {mobile.length < 1 ? null : mobileVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {mobile.length < 1 ? null : mobileVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              El numero de Teléfono debe tener 8 digitos.
            </Text>
          )}

          {/* numero_empleado */}
          <View style={styles.action}>
            <FontAwesome
              name="vcard"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Número de empleado"
              style={styles.textInput}
              onChange={(e) => handleNumero_empleado(e)}
            />
            {numero_empleado.length < 1 ? null : numero_empleadoVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>

          {numero_empleado.length < 1 ? null : numero_empleadoVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              El número de empleado debe tener digitos.
            </Text>
          )}

          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Contraseña"
              style={styles.textInput}
              onChange={(e) => handlePassword(e)}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name="eye-off"
                  style={{ marginRight: -10 }}
                  color={passwordVerify ? "green" : "red"}
                  size={23}
                />
              ) : (
                <Feather
                  name="eye"
                  style={{ marginRight: -10 }}
                  color={passwordVerify ? "green" : "red"}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              La constraseña debe tener mayusculas y minusculas y números.
            </Text>
          )}
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.inBut}
            onPress={() => {
              handleSubmit();
            }}
          >
            <View>
              <Text style={styles.textSign}>Registrate</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default RegisterPage;
