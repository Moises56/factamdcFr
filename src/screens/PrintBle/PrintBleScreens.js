import React, { useState } from "react";
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
import { Dialog, Portal, Provider, Badge } from "react-native-paper";

const PrintBleScreens = () => {
  const { devices, connectedDevice, scanning, startScan, connectDevice } =
    useBluetooth();
  const [visible, setVisible] = useState(false);

  const handleStartScan = async () => {
    try {
      await startScan();
    } catch (error) {
      if (error.message === "NOT_STARTED") {
        showDialog();
      } else {
        console.error(error);
      }
    }
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnOk} onPress={handleStartScan}>
          <Text style={styles.buttonText}>Escanear Dispositivos</Text>
        </TouchableOpacity>
        {/* <Button
          title="Escanear Dispositivos"
          onPress={handleStartScan}
          color="#5ccedf"
        /> */}
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
        {connectedDevice && (
          <Badge style={styles.badge}>
            Conectado a: {connectedDevice.name}
          </Badge>
        )}
        {!connectedDevice && (
          <Text style={styles.noDeviceText}>No hay dispositivo conectado</Text>
        )}
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={styles.Content}
          >
            <Dialog.Icon icon="bluetooth-off" />
            <Dialog.Title style={styles.title}>
              Configuración del Bluetooth
            </Dialog.Title>
            <Dialog.Content>
              <Text style={styles.subTitle}>
                Por favor, habilite el Bluetooth para escanear el dispositivo.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <TouchableOpacity style={styles.btnOk} onPress={hideDialog}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableOpacity>
              {/* <Button onPress={hideDialog} title="OK" /> */}
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    color: "#fff",
  },
  btnOk: {
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
  Content: {
    backgroundColor: "#333",
  },
  badge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#5ccedf",
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  noDeviceText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default PrintBleScreens;
