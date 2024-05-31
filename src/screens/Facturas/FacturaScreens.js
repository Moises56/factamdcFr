import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import { getInvoices } from "../../services/FacturaService";

function FacturaScreens() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Función para obtener todas las facturas getInvoices
  const obtenerFacturas = async () => {
    try {
      const response = await getInvoices(); // Llamar a la función para obtener las facturas
      // Verificar si la respuesta tiene la propiedad 'data'
      if (response && response.data) {
        setFacturas(response.data); // Actualizar el estado con las facturas obtenidas
      } else {
        setFacturas([]); // Inicializar facturas como un array vacío si la respuesta no tiene 'data'
      }
      setLoading(false); // Cambiar el estado de carga a falso
    } catch (error) {
      console.error("Error al obtener facturas", error);
    }
  };

  useEffect(() => {
    obtenerFacturas(); // Llamar a la función para obtener las facturas cuando el componente se monta
  }, []);

  // const renderFacturaItem = ({ item }) => (
  //   <TouchableOpacity
  //     onPress={() => {
  //       setSelectedFactura(item);
  //       setModalVisible(true);
  //     }}
  //   >
  //     <View style={styles.facturaItem}>
  //       <Text>#: {item.id}</Text>
  //       <Text>Mercado: {item.mercado}</Text>
  //       <Text>Número Local: {item.numero_local}</Text>
  //       <Text>Propietario: {item.propietario}</Text>
  //       <Text>Fecha: {item.fecha_creacion}</Text>
  //       <Text>Monto: {item.monto}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  const renderFacturaItem = ({ item }) => {
    // Convertir la cadena de fecha a un objeto de fecha
    const fechaFactura = new Date(item.fecha_creacion);

    // Obtener los componentes de la fecha
    const year = fechaFactura.getFullYear();
    const month = ("0" + (fechaFactura.getMonth() + 1)).slice(-2); // Se agrega 1 al mes ya que los meses son base 0
    const day = ("0" + fechaFactura.getDate()).slice(-2);
    const hours = ("0" + fechaFactura.getHours()).slice(-2);
    const minutes = ("0" + fechaFactura.getMinutes()).slice(-2);
    const seconds = ("0" + fechaFactura.getSeconds()).slice(-2);

    // Verificar si es AM o PM
    const amOrPm = fechaFactura.getHours() < 12 ? "AM" : "PM";

    // Convertir la hora a formato de 12 horas
    const formattedHours = fechaFactura.getHours() % 12 || 12;

    // Construir la cadena de fecha formateada
    const fechaFormateada = `${year}-${month}-${day} - ${formattedHours}:${minutes}:${seconds} ${amOrPm}`;

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedFactura(item);
          setModalVisible(true);
        }}
      >
        <View style={styles.facturaItem}>
          <Text>#: {item.id}</Text>
          <Text>Mercado: {item.mercado}</Text>
          <Text>Número Local: {item.numero_local}</Text>
          <Text>Propietario: {item.propietario}</Text>
          <Text>Fecha: {fechaFormateada}</Text>
          <Text>Monto: {item.monto}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModalContent = () => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalContent}>
        <Text>ID: {selectedFactura?.id}</Text>
        <Text>Mercado: {selectedFactura?.mercado}</Text>
        <Text>Propietario: {selectedFactura?.propietario}</Text>
        <Text>DNI: {selectedFactura?.DNI}</Text>
        <Text>Permiso de Operación: {selectedFactura?.permiso_operacion}</Text>
        <Text>Fecha Factura: {selectedFactura?.fechaFactura}</Text>
        <Text>Número de Local: {selectedFactura?.numero_local}</Text>
        <Text>Concepto: {selectedFactura?.concepto}</Text>
        <Text>Mes: {selectedFactura?.mes}</Text>
        <Text>Monto a pagar: {selectedFactura?.monto}</Text>
        <Text>Usuario: {selectedFactura?.usuario}</Text>
        <Text>Fecha de Creación: {selectedFactura?.fecha_creacion}</Text>
        {/* <Button title="Cerrar" onPress={() => setModalVisible(false)} /> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : facturas.length === 0 ? (
        <Text>No hay facturas disponibles</Text>
      ) : (
        <FlatList
          data={facturas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFacturaItem}
        />
      )}
      {selectedFactura && renderModalContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  facturaItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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

export default FacturaScreens;
