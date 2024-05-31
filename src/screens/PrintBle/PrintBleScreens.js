import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useBluetooth } from "./BluetoothContext";

const PrintBleScreens = () => {
  const { devices, connectedDevice, scanning, startScan, connectDevice } =
    useBluetooth();

  const handleStartScan = async () => {
    try {
      await startScan();
    } catch (error) {
      if (error.message === "NOT_STARTED") {
        showBluetoothAlert();
      } else {
        console.error(error);
      }
    }
  };

  const showBluetoothAlert = () => {
    Alert.alert(
      "Configuracion del Bluetooth",
      "Por favor, habilite el Bluetooth para escanear el dispositivo.",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="Escanear Dispositivos"
        onPress={handleStartScan}
        color="#5ccedf"
      />
      {scanning && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.spinner}
        />
      )}
      <FlatList
        data={devices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => connectDevice(item)}
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor: "#ccc",
              borderRadius: 5,
            }}
          >
            <Text>{item.name || "Unnamed Device"}</Text>
            <Text>{item.address}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.conect}>
        {connectedDevice
          ? `Conectado a: ${connectedDevice.name}`
          : "No hay dispositivo conectado"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  spinner: {
    marginVertical: 20,
  },
  conect: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default PrintBleScreens;
