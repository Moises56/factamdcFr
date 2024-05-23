import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useBluetooth } from "./BluetoothContext";

const PrintBleScreens = () => {
  const { devices, connectedDevice, scanning, startScan, connectDevice } =
    useBluetooth();

  return (
    <View style={styles.container}>
      <Button title="Scanear Dispositivos" onPress={startScan} />
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
      <Text>
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
});

export default PrintBleScreens;
