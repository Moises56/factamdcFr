import React, { useState } from "react";
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
import { useBluetooth } from "../../screens/PrintBle/BluetoothContext"; // Asegúrate de que la ruta sea correcta

const LocalDetailScreen = ({ route, navigation }) => {
  const { local } = route.params;
  const [selectedMonth, setSelectedMonth] = useState("Enero");
  const [modalVisible, setModalVisible] = useState(false);
  const { printInvoice, loggedInUser } = useBluetooth(); // Obtener loggedInUser desde BluetoothContext
  const [user, setUser] = useState(""); // Estado para el usuario logueado

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

  const generateInvoice = () => {
    const invoiceDetails = {
      mercado: local.nombre_mercado,
      propietario: local.propietario,
      fechaFactura: new Date().toLocaleDateString(),
      local: local.numero_local,
      concepto: "Pago del mes por impuesto",
      mes: selectedMonth,
      monto: local.monto,
      // usuario logueado
      usuario: loggedInUser, // Usar loggedInUser en lugar de user
    };

    Alert.alert("Factura generada", JSON.stringify(invoiceDetails, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Local</Text>
      <Text style={styles.label}>Nombre del Local: {local.nombre_local}</Text>
      <Text style={styles.label}>Propietario: {local.propietario}</Text>
      <Text style={styles.label}>Tipo: {local.tipo_local}</Text>
      <Text style={styles.label}>Estado: {local.estado_local}</Text>
      <Text style={styles.label}>Dirección: {local.direccion}</Text>
      <Text style={styles.label}>Teléfono: {local.telefono}</Text>
      <Text style={styles.label}>Monto: {local.monto}</Text>
      <Text style={styles.label}>
        Fecha de Creación: {new Date(local.fecha_creacion).toLocaleDateString()}
      </Text>

      <Text style={styles.label}>Mes seleccionado: {selectedMonth}</Text>
      <Button title="Seleccionar Mes" onPress={() => setModalVisible(true)} />

      <Button title="Generar Factura" onPress={generateInvoice} />

      <Button
        title="Imprimir Factura"
        onPress={() =>
          printInvoice({
            mercado: local.nombre_mercado,
            propietario: local.propietario,
            fechaFactura: new Date().toLocaleDateString(),
            monto: local.monto,
            mes: selectedMonth,
            concepto: "Pago del mes por impuesto",
            local: local.numero_local,
            // usuario logueado
            usuario: loggedInUser, // Usar loggedInUser en lugar de user
          })
        }
      />

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
});

export default LocalDetailScreen;
