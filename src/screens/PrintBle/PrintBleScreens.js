import React, { useState, useEffect, createContext, useContext } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  BluetoothManager,
  BluetoothEscposPrinter,
} from "react-native-bluetooth-escpos-printer";
import {
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import styles from "../Auth/style";

const PrintBleScreens = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const statuses = await requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      ]);
      if (
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
          RESULTS.GRANTED &&
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === RESULTS.GRANTED &&
        statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === RESULTS.GRANTED
      ) {
        console.log("Permissions granted");
      } else {
        console.log("Permissions denied");
      }
    } catch (error) {
      console.error("Permission error:", error);
    }
  };

  const startScan = () => {
    if (!scanning) {
      setDevices([]);
      setScanning(true);
      BluetoothManager.scanDevices().then(
        (s) => {
          const foundDevices = JSON.parse(s);
          const paired = foundDevices.paired;
          const found = foundDevices.found;
          setDevices([...paired, ...found]);
          setScanning(false);
        },
        (err) => {
          console.error(err);
          setScanning(false);
        }
      );
    }
  };

  const connectDevice = (device) => {
    BluetoothManager.connect(device.address).then(
      (s) => {
        console.log("Connected to", device.name);
        setConnectedDevice(device);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const printInvoice = async () => {
    const columnWidths = [24, 24];
    const receiptNo = 120;
    const receiptDate = new Date();
    const originalAccount = "1239";
    const branch = "Branch Name";
    const telephone = "123-456-7890";
    const salesman = "John Doe";
    const productCode = "P123";
    const amount = "500.00";
    const discount = "50.00";
    const amountReceived = "450.00";
    const paymentMethod = "Credit Card";
    const receivedFrom = "John Smith";
    const fcuser = "AMDC-FACTURA";
    const collectionRecieptNo = 121;

    if (connectedDevice) {
      await BluetoothEscposPrinter.printerAlign(
        await BluetoothEscposPrinter.ALIGN.CENTER
      );
      await BluetoothEscposPrinter.printText("AMDC-FACTURA\n", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 2,
        heigthtimes: 2,
        fonttype: 1,
        aling: "center",
      });
      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.printText(
        collectionRecieptNo + "COLLECTION RECIEPT",
        {}
      );

      await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Receipt No: " + receiptNo],
        {}
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Receipt Date: " + receiptDate],
        {}
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Original A/C:" + originalAccount],
        {}
      );

      await BluetoothEscposPrinter.printText("\r\n", {});

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Branch:" + branch],
        {}
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Telephone:" + telephone],
        {}
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Salesman:" + salesman],
        {}
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Product Code:" + productCode],
        {}
      );

      await BluetoothEscposPrinter.printText("\r\n", {});

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Amount:" + amount + "/="],
        {}
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Discount:" + discount + "/="],
        {}
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Amount Received:" + amountReceived + "/="],
        {}
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Payment Method:" + paymentMethod],
        {}
      );

      await BluetoothEscposPrinter.printText("\r\n", {});

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Received From:" + receivedFrom],
        {}
      );

      await BluetoothEscposPrinter.printText("\r\n", {});

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Signature:" + "..................."],
        {}
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ["Printed By:" + fcuser],
        {}
      );

      await BluetoothEscposPrinter.printText("\r\n", {});
    } else {
      console.log("No device connected");
    }
  };

  return (
    <View style={style.container}>
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
      <Button
        title="Imprimir Factura"
        onPress={printInvoice}
        disabled={!connectedDevice}
      />
    </View>
  );
};

const style = StyleSheet.create({
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
