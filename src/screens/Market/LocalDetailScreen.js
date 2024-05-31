import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Importar useNavigation
import { useBluetooth } from "../../screens/PrintBle/BluetoothContext"; // Asegúrate de que la ruta sea correcta
import { saveInvoice } from "../../services/FacturaService"; // Importar la función de guardar factura

const LocalDetailScreen = ({ route }) => {
  const { local } = route.params;
  const [selectedMonth, setSelectedMonth] = useState("Enero");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // Utilizar useNavigation para la navegación
  const { printInvoice, isBluetoothConnected } = useBluetooth(); // Obtener loggedInUser y el estado de Bluetooth desde BluetoothContext
  const [user, setUser] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const loggedInUser = await AsyncStorage.getItem("loggedInUser");
    setUser(loggedInUser);
  };

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const generateInvoiceDetails = () => {
    return {
      mercado: local.nombre_mercado,
      propietario: local.propietario,
      fechaFactura: new Date().toLocaleDateString(),
      numero_local: local.numero_local,
      concepto: "Pago del mes por impuesto de renta",
      mes: selectedMonth,
      monto: local.monto,
      usuario: user,
      DNI: local.DNI,
      permiso_operacion: local.permiso_operacion,
    };
  };

  const handlePrintInvoice = async () => {
    const invoiceDetails = generateInvoiceDetails();

    if (!isBluetoothConnected()) {
      Alert.alert(
        "Bluetooth Desconectado",
        "Por favor, permita la conexión Bluetooth para imprimir la factura.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Configuración Bluetooth",
            onPress: () => navigation.navigate("Configuracion"), // Navegar a la pantalla de configuración de Bluetooth
          },
        ]
      );
      return;
    }

    try {
      const result = await saveInvoice(invoiceDetails);
      if (result) {
        printInvoice(invoiceDetails);
        Alert.alert(
          "Factura Generada",
          "La factura ha sido guardada e impresa exitosamente.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert("Error", "No se pudo guardar la factura.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar la factura.");
      console.error("Error saving invoice", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Local</Text>
      <Text style={styles.label}>Nombre del Local: {local.nombre_local}</Text>
      <Text style={styles.label}>Propietario: {local.propietario}</Text>
      <Text style={styles.label}>Tipo: {local.tipo_local}</Text>
      <Text style={styles.label}>Estado: {local.estado_local}</Text>
      <Text style={styles.label}>Dirección: {local.direccion}</Text>
      <Text style={styles.label}>Teléfono: {local.telefono}</Text>
      <Text style={styles.label}>
        Fecha de Creación: {new Date(local.fecha_creacion).toLocaleDateString()}
      </Text>
      <Text style={styles.label}>DNI: {local.DNI}</Text>
      <Text style={styles.label}>
        Permiso de Operación: {local.permiso_operacion}
      </Text>
      <Text style={styles.label}>Monto: {local.monto}</Text>

      <Text style={styles.label}>Mes seleccionado: {selectedMonth}</Text>
      {/* <Button
        title="Seleccionar Mes"
        onPress={() => setModalVisible(true)}
        color="#5ccedf"
        style={styles.button}
      />

      <Button
        title="Imprimir Factura"
        onPress={handlePrintInvoice}
        style={styles.button}
      /> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Seleccionar Mes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePrintInvoice}>
        <Text style={styles.buttonText}>Imprimir Factura</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Seleccione el Mes</Text>
          <ScrollView>
            {months.map((month, index) => (
              <TouchableOpacity
                key={index}
                style={styles.monthOption}
                onPress={() => {
                  setSelectedMonth(month);
                  setModalVisible(false);
                }}
              >
                <Text>{month}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  monthOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  button: {
    marginVertical: 10,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#5ccedf",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LocalDetailScreen;
